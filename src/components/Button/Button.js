import React from "react";
import { press } from "../../services/hitButton";

/**
 * props:
 * - char
 * - classChar
 */
function Button(props) {

    function hit() {
        return press(props.char)
    }
    return (
        <button id="button" className={props.classChar} onClick={hit}>
            <div className="char">{props.char}</div>
        </button>
    )
}

export default Button;