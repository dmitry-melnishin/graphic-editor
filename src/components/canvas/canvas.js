import React, {useState} from "react";

import "./canvas.css";

import {setNewImageIndex} from "../../helpers/set-new-image-index";
import {setImagePath} from "../../helpers/set-image-path";
import {getImageCoefficient} from "../../helpers/get-image-coefficient";

import {DEFAULT_IMAGE_COEFFICIENT, INCREASE} from "../../constants";

const SCROLL_WIDTH = 18;

export const Canvas = ({
    isImageEffectExist,
    canvasRef,
    canvasSize,
    contextRef
}) => {
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = ({ nativeEvent }) => {
        if (isImageEffectExist) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing || isImageEffectExist) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    const finishDrawing = () => {
        if (isImageEffectExist) {
            return;
        }

        contextRef.current.closePath();
        setNewImageIndex(INCREASE);

        setImagePath(canvasRef);
        setIsDrawing(false);
    }

    const canvasContainerStyles = getImageCoefficient() < DEFAULT_IMAGE_COEFFICIENT
        ? { width: `${canvasSize.width + SCROLL_WIDTH}px`, height: `${canvasSize.height + SCROLL_WIDTH}px` }
        : {};

    return (
        <div
            className="canvas-container"
            style={canvasContainerStyles}
        >
            <canvas
                className={`canvas ${isImageEffectExist && "cursor-not-allowed"}`}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                width={canvasSize.width}
                height={canvasSize.height}
            >
            </canvas>
        </div>
    );
}