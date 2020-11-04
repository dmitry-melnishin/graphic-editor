import {DEFAULT_IMAGE_INDEX} from "../constants";

export const getImageIndex = () => {
    return JSON.parse(localStorage.getItem('curImageIndex')) ?? DEFAULT_IMAGE_INDEX;
};
