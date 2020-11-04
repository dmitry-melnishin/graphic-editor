import React from "react";

export const Button = ({ classes, handler, name, isDisabled }) => (
    <button
        className={classes}
        onClick={handler}
        disabled={isDisabled}
    >
        {name}
    </button>
);
