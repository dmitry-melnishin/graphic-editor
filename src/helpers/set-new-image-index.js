import {INCREASE} from "../constants";
import {getImageIndex} from "./get-image-index";

export const setNewImageIndex = flag => {
    let prevCurImageIndex = getImageIndex();

    flag === INCREASE ? prevCurImageIndex += 1 : prevCurImageIndex -= 1;
    localStorage.setItem('curImageIndex', prevCurImageIndex);
}