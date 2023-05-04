import React from "react";

/**
 * props:
 * - curr
 * - expression
 */
function Screen(props) {
    return (
        <div>
            <div className="expression">{props.expression}</div>
            <div className="curr">{props.curr}</div>
        </div>
    )
}

export default Screen;