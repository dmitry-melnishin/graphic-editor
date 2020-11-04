import {DEFAULT_IMAGE_COEFFICIENT} from "../constants";

export const getImageCoefficient = () => {
    const prevImageCoefficient = JSON.parse(localStorage.getItem('imageCoefficient'));

    return prevImageCoefficient || DEFAULT_IMAGE_COEFFICIENT;
}