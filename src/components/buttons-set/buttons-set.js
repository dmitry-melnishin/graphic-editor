import React from "react";

import {Button} from "../button";

import {setNewImageIndex} from "../../helpers/set-new-image-index";
import {getImagePaths} from "../../helpers/get-image-path";
import {getImageCoefficient} from "../../helpers/get-image-coefficient";
import {setImageCoefficient} from "../../helpers/set-image-coefficient";

import {
    DECREASE,
    DEFAULT_IMAGE_COEFFICIENT,
    DEFAULT_IMAGE_INDEX,
    INCREASE,
    REDO,
    RESIZING_STEP,
    UNDO
} from "../../constants";

const BLUR = 'BLUR';
const SHADOW = 'SHADOW';

export const ButtonsSet = ({
    isImageEffectExist,
    imageEffect,
    pasteImage,
    addFilter,
    removeImage,
    lineWidth,
    resizingLineWidth,
    handleClear
}) => {
    const changeImageSize = flag => {
        const imageCoefficient = getImageCoefficient();

        if (flag === DECREASE && imageCoefficient === RESIZING_STEP) {
            return;
        }

        if (imageCoefficient === DEFAULT_IMAGE_COEFFICIENT) {
            resizingLineWidth.current = lineWidth;
        }

        const isChangedSourceImageSize = imageCoefficient === DEFAULT_IMAGE_COEFFICIENT;

        setImageCoefficient(flag);
        removeImage();

        if (isImageEffectExist) {
            addFilter({ effect: imageEffect.current, isSizeChanged: true });
        } else {
            pasteImage({ isChangedSourceImageSize });
        }
    }

    const changeImageIndex = flag => {
        const curImageIndex = parseInt(localStorage.getItem('curImageIndex'));

        if (flag === UNDO && curImageIndex !== DEFAULT_IMAGE_INDEX) {
            setNewImageIndex(DECREASE);
        } else if (flag === REDO && curImageIndex !== getImagePaths().length - 1) {
            setNewImageIndex(INCREASE);
        }
    }

    const changeImage = flag => {
        changeImageIndex(flag);
        removeImage();
        pasteImage();
    }

    const handleUndo = () => {
        changeImage(UNDO);
    }

    const handleRedo = () => {
        changeImage(REDO);
    }

    const increaseImageSize = () => {
        changeImageSize(INCREASE);
    }

    const decreaseImageSize = () => {
        changeImageSize(DECREASE);
    }

    const handleBlurEffect = () => {
        addFilter({ effect: BLUR });
    }

    const handleShadowEffect = () => {
        addFilter({ effect: SHADOW });
    }

    const buttonsProps = [
        { handler: handleClear, name: "Clear" },
        { handler: handleUndo, name: "Undo", isDisabled: isImageEffectExist },
        { handler: handleRedo, name: "Redo", isDisabled: isImageEffectExist },
        { handler: increaseImageSize, name: "+" },
        { handler: decreaseImageSize, name: "-" },
        { classes: `${imageEffect.current === BLUR && "green"}`, handler: handleBlurEffect, name: "Add blur" },
        { classes: `${imageEffect.current === SHADOW && "green"}`, handler: handleShadowEffect, name: "Add shadow" }
    ];

    return buttonsProps.map(buttonProps => (
        <Button
            key={buttonProps.name}
            {...buttonProps}
        />
    ));
};