import React from "react";

import {RESIZING_STEP} from "../../constants";

export const RangeSlider = ({ lineWidth, setLineWidth, resizingLineWidth }) => {
    const changeLineWidth = event => {
        const { target: { value } } = event;

        setLineWidth(parseInt(value));
        resizingLineWidth.current = parseInt(value);
    }

    return (
        <div>
            <span>Line width</span>
            <input
                type="range"
                onChange={changeLineWidth}
                value={lineWidth}
                min="3"
                max="12"
                step={RESIZING_STEP}
            />
        </div>
    )
}