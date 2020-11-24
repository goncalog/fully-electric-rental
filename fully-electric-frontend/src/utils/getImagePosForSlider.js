export default function getImagePosForSlider(imageUrlsLength, currentImage) {
    if (currentImage < 0) {
        currentImage =  imageUrlsLength - (Math.abs(currentImage) % imageUrlsLength);
    }

    if (currentImage === 0) {
        return 0;
    } else {
        return currentImage % imageUrlsLength;
    }
}
