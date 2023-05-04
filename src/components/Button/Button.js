import React, { useState, useEffect } from "react";
import {Calc} from "../Screen/Calc";

function Button(props) {

    const [classChar, setClassChar] = useState('number');

    useEffect(() => {
        if (typeof props.char === 'number') return;
        else setClassChar('tools');
    }, [])

    function hit() {
        return Calc(props.char)
    }

    return (
        <button id="button" className={classChar} onClick={hit}>
            <div className="char">{props.char}</div>
        </button>
    )
}

export default Button;