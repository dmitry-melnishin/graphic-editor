import React, {useEffect, useRef, useState} from "react";

import "./App.css";

import {Palette} from "./components/palette";
import {RangeSlider} from "./components/range-slider/range-slider";
import {ButtonsSet} from "./components/buttons-set";
import {Canvas} from "./components/canvas";

import {getImagePaths} from "./helpers/get-image-path";
import {getImageIndex} from "./helpers/get-image-index";
import {getImageCoefficient} from "./helpers/get-image-coefficient";

import {INCREASE} from "./constants";
import {setNewImageIndex} from "./helpers/set-new-image-index";
import {setImagePath} from "./helpers/set-image-path";

const DEFAULT_LINE_WIDTH = 4;
const DEFAULT_CANVAS_WIDTH = 572;
const DEFAULT_CANVAS_HEIGHT = 330;
const FILTERS = {
    BLUR: "blur(4px)",
    SHADOW: "drop-shadow(-9px 9px 3px #e81)"
};

function App() {
    const [isImageEffectExist, setIsImageEffectExist] = useState(false);
    const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH);
    const [canvasSize, setCanvasSize] = useState({width: DEFAULT_CANVAS_WIDTH, height: DEFAULT_CANVAS_HEIGHT});

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const imageEffect = useRef('');
    const resizingLineWidth = useRef(0);
    const sourceImageSize = useRef({width: 0, height: 0});

    const removeImage = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const pasteImage = props => {
        const imageCoefficient = getImageCoefficient();
        const imageElement = new Image();

        imageElement.src = getImagePaths()[getImageIndex()];

        imageElement.onload = () => {
            if (props?.isChangedSourceImageSize && !sourceImageSize.current.width) {
                sourceImageSize.current.width = imageElement.width;
                sourceImageSize.current.height = imageElement.height;
            }

            const imageWidth = (sourceImageSize.current.width || imageElement.width) * imageCoefficient;
            const imageHeight = (sourceImageSize.current.height || imageElement.height) * imageCoefficient;

            setCanvasSize({ width: imageWidth, height: imageHeight });

            if (props?.effect) {
                contextRef.current.filter = FILTERS[props.effect];
            }
            console.log('resizingLineWidth.current', resizingLineWidth.current)
            console.log('imageCoefficient', imageCoefficient)
            contextRef.current.drawImage(imageElement, 0, 0, imageWidth, imageHeight);
            setLineWidth(resizingLineWidth.current * imageCoefficient);
        }
    }

    const removeFilter = () => {
        setIsImageEffectExist(false);
        imageEffect.current = '';
        contextRef.current.filter = 'none';
    }

    const handleClear = () => {
        removeImage();
        setNewImageIndex(INCREASE);
        setImagePath(canvasRef);
        removeFilter();
    }

    const addFilter = ({effect, isSizeChanged}) => {
        if (isImageEffectExist && !isSizeChanged) {
            removeImage();
            removeFilter();
            pasteImage();
            setLineWidth(resizingLineWidth.current * getImageCoefficient());
        } else {
            setIsImageEffectExist(true);
            imageEffect.current = effect;
            removeImage();
            pasteImage({ effect });
        }
    }

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');

        context.lineCap = 'round';
        context.lineWidth = lineWidth;
        contextRef.current = context;

        if (localStorage.getItem('imagePaths')) {
            pasteImage();
        }
    }, []);

    useEffect(() => {
        contextRef.current.lineWidth = lineWidth;
    }, [lineWidth]);

    return (
        <div className="container">
            <div className="control-items">
                <Palette contextRef={contextRef}/>
                <div className="buttons-container">
                    <RangeSlider
                        lineWidth={lineWidth}
                        setLineWidth={setLineWidth}
                        resizingLineWidth={resizingLineWidth}
                    />
                    <ButtonsSet
                        isImageEffectExist={isImageEffectExist}
                        imageEffect={imageEffect}
                        lineWidth={lineWidth}
                        addFilter={addFilter}
                        removeImage={removeImage}
                        pasteImage={pasteImage}
                        resizingLineWidth={resizingLineWidth}
                        handleClear={handleClear}
                    />
                </div>
            </div>
            <Canvas
                isImageEffectExist={isImageEffectExist}
                canvasRef={canvasRef}
                canvasSize={canvasSize}
                contextRef={contextRef}
            />
        </div>
    );
}

export default App;
