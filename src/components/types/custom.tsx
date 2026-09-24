/* ma byź 7 -> tyle ile w bulmie */
export type componentSize = "XXS" | "S" | "XS" | "M" | "L" | "XL" | "XXL";
export const componentSizeMap: { [key in componentSize]: string } = {
    XXS: "is-size-7",
    XS: "is-size-6",
    S: "is-size-5",
    M: "is-size-4",
    L: "is-size-3",
    XL: "is-size-2",
    XXL: "is-size-1",
};

/* status procedury zapytania do API
Start - rozpocznik
Idle - nic nie rów  */
export type requestState = "Start" | "Progress" | "OK" | "Error" | "Idle";
