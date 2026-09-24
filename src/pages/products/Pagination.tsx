import { MouseEventHandler, Ref } from "react";

const Pagination = (props: {
    maxPage: number;
    currPage: number;
    handleOnClick: (pg: number) => void;
}) => {
    return (
        <>
            <nav
                className="pagination is-centered"
                role="navigation"
                aria-label="pagination"
            >
                <a
                    className="pagination-previous"
                    onClick={() =>
                        props.handleOnClick(
                            props.currPage > 0
                                ? props.currPage - 1
                                : props.currPage
                        )
                    }
                >
                    <span className="icon">
                        <i className="fas fa-arrow-left"></i>
                    </span>
                </a>
                <a
                    className="pagination-next"
                    onClick={() =>
                        props.handleOnClick(
                            props.currPage > props.maxPage
                                ? props.maxPage
                                : props.maxPage + 1
                        )
                    }
                >
                    <span className="icon">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                </a>
                <ul className="pagination-list">
                    <li>
                        <a className="pagination-link" aria-label="Goto page 1">
                            1
                        </a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a
                            className="pagination-link"
                            aria-label="Goto page 45"
                        >
                            45
                        </a>
                    </li>
                    <li>
                        <a
                            className="pagination-link is-current"
                            aria-label="Page 46"
                            aria-current="page"
                        >
                            46
                        </a>
                    </li>
                    <li>
                        <a
                            className="pagination-link"
                            aria-label="Goto page 47"
                        >
                            47
                        </a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a
                            className="pagination-link"
                            aria-label="Goto page 86"
                        >
                            86
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
