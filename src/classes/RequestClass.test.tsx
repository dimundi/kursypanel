import { jest, test, expect, afterEach } from "@jest/globals";
import { StrictMode, useEffect, useState } from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import RequestClass from "./RequestClass";

afterEach(() => { cleanup(); jest.restoreAllMocks(); sessionStorage.clear(); });

test("StrictMode shares pending reads and delivers data to the active effect", async () => {
    const callbacks: Array<(data: any) => void> = [];
    const request = jest.spyOn(RequestClass, "makeRequest").mockImplementation((path, options, success) => {
        callbacks.push(success!);
    });
    function Reader() {
        const [value, setValue] = useState("loading");
        useEffect(() => {
            let active = true;
            RequestClass.readShared("usr/courses/", () => { if (active) setValue("loaded"); }, () => {});
            return () => { active = false; };
        }, []);
        return <div>{value}</div>;
    }
    render(<StrictMode><Reader /></StrictMode>);
    expect(request).toHaveBeenCalledTimes(1);
    await act(async () => { callbacks[0]({ courses: [] }); });
    expect(screen.getByText("loaded")).toBeTruthy();
    const next = RequestClass.readShared("usr/courses/", () => {}, () => {});
    expect(request).toHaveBeenCalledTimes(2);
    callbacks[1]({});
    await next;
});

test("different users do not share requests", async () => {
    const callbacks: Array<(data: any) => void> = [];
    const request = jest.spyOn(RequestClass, "makeRequest").mockImplementation((path, options, success) => {
        callbacks.push(success!);
    });
    sessionStorage.setItem("access_token", "user-a");
    const a = RequestClass.readShared("usr/", () => {}, () => {});
    sessionStorage.setItem("access_token", "user-b");
    const b = RequestClass.readShared("usr/", () => {}, () => {});
    expect(request).toHaveBeenCalledTimes(2);
    callbacks.forEach(callback => callback({}));
    await Promise.all([a, b]);
});

test("failed reads notify all subscribers and can be retried", async () => {
    const callbacks: Array<(error: any) => void> = [];
    const request = jest.spyOn(RequestClass, "makeRequest").mockImplementation((path, options, success, failure) => {
        callbacks.push(failure!);
    });
    const failure = jest.fn();
    const a = RequestClass.readShared("usr/", () => {}, failure);
    const b = RequestClass.readShared("usr/", () => {}, failure);
    expect(request).toHaveBeenCalledTimes(1);
    callbacks[0]({ status: 500 });
    await Promise.all([a, b]);
    expect(failure).toHaveBeenCalledTimes(2);
    const retry = RequestClass.readShared("usr/", () => {}, failure);
    expect(request).toHaveBeenCalledTimes(2);
    callbacks[1]({ status: 500 });
    await retry;
});