export default function getEvFeaturesArray(featuresArray) {
    return featuresArray.map((item) => {
       return { name: item };
    });
}
