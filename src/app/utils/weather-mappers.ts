export const mapGeocodingDataToCoordinates = (data: any) => {
  return {
    latitude: data?.results[0]?.latitude,
    longitude: data?.results[0]?.longitude,
  };
};
