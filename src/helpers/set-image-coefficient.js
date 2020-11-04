import {getImageCoefficient} from "./get-image-coefficient";
import {DECREASE, DEFAULT_IMAGE_COEFFICIENT, INCREASE, RESIZING_STEP} from "../constants";

export const setImageCoefficient = flag => {
    let imageCoefficient = getImageCoefficient();

    switch (flag) {
        case INCREASE:
            imageCoefficient += RESIZING_STEP;
            break;
        case DECREASE:
            imageCoefficient -= RESIZING_STEP;
            break;
        default:
            imageCoefficient = DEFAULT_IMAGE_COEFFICIENT;
    }

    const roundedImageCoefficient = Math.round(imageCoefficient * 10) / 10;

    localStorage.setItem('imageCoefficient', JSON.stringify(roundedImageCoefficient));
}