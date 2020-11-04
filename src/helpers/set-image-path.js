import {getImagePaths} from "./get-image-path";

export const setImagePath = canvasRef => {
    const newImagePath = canvasRef.current.toDataURL();

    localStorage.setItem('imagePaths', JSON.stringify([...getImagePaths(), newImagePath]));
}