import React, { useState, useEffect } from "react";

/**
 * props:
 * - info
 */
function PastListTag(props) {

    const [info, setInfo] = useState('');

    useEffect(() => {
        setInfo(props.info);
    }, [props.info])

    return (
        <div className="PastListSession">
            {
                info && info.length > 0
                    ? info.map((a, b) => {
                        return (
                            <div key={b} className="PastList">
                                <div className="item">
                                    <div className="date">{info[b].date}</div>
                                    <div className="expressionList">{info[b].expression}</div>
                                </div>
                            </div>
                        )
                    }).reverse()
                    : <React.Fragment></React.Fragment>
            }
        </div>
    )
}

export default PastListTag;