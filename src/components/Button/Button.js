import React, { useState, useEffect } from "react";

function Button(props) {

    const [classChar, setClassChar] = useState('number');

    useEffect(() => {
        if (typeof props.char === 'number') return;
        else setClassChar('tools');
    }, [])

    return (
            <button className={classChar} onClick={() => props.onClick(props.char)}>
                {props.char}
            </button>
    )
}

export default Button;