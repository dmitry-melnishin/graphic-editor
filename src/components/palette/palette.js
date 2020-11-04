import React, {useMemo} from "react";

import "./palette.css";

export const Palette = ({ contextRef }) => {
    const changeLineColor = event => {
        if (event.target.className !== 'palette-item') {
            return;
        }

        contextRef.current.strokeStyle = event.target.style.backgroundColor;
    }

    const getColorIntensity = (value, max) => Math.round(value * 255 / max);

    const colors = useMemo(() => {
        const colorsSet = [];
        const max = 4;

        for (let r = 0; r <= max; r++) {
            for (let g = 0; g <= max; g++) {
                for (let b = 0; b <= max; b++) {
                    const color =
                        `rgb(${getColorIntensity(r, max)}, ${getColorIntensity(g, max)}, ${getColorIntensity(b, max)})`;

                    colorsSet.push(color);
                }
            }
        }

        return colorsSet;
    }, [])

    return (
        <div
            className="palette"
            onClick={changeLineColor}
        >
            {
                colors.map(color => (
                    <div
                        className="palette-item"
                        key={color}
                        style={{ backgroundColor: color }}
                    >
                    </div>
                ))
            }
        </div>
    );
}