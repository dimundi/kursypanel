import React from 'react';

const QuestionDropdown = (q, onClick) => {
    return(
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Dropdown button</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
                <a className="dropdown-item">
                    Dropdown item
                </a>
            </div>
            </div>
        </div>
    );
}

export default QuestionDropdown;