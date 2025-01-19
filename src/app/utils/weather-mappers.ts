import {Coordinates} from "../../todo-data";

export const mapGeocodingDataToCoordinates = (data: any): Coordinates => {
  return {
    latitude: data?.results[0]?.latitude,
    longitude: data?.results[0]?.longitude,
  };
};
