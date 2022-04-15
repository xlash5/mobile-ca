import GetLocation from 'react-native-get-location'

export default async () => {
    let coords = {}
    await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(location => {
            coords = {
                latitude: location.latitude,
                longitude: location.longitude,
            }
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
            return coordsString;
        })
    return coords;
}