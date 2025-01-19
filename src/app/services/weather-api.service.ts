import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Coordinates} from "../../todo-data";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  //można też dodać do environment.ts
  private geocodingBaseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private openMeteoBaseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private httpClient: HttpClient) {
  }

  // należałoby określić typ odbieranych danych, jednak zakładając, że public api może się zmienić zdecydowałem się tego nie robić
  getCoordinates(city: string): Observable<any> {
    return this.httpClient.get(this.getGeocodingUrl(city));
  }

  // jak wyżej
  getWeather(coordinates: Coordinates): Observable<any> {
    return this.httpClient.get(this.getMeteoUrl(coordinates));
  }

  private getGeocodingUrl(city: string): string {
    const params = new URLSearchParams({
      name: city,
      count: '10',
      language: 'pl',
      format: 'json'
    });

    return `${this.geocodingBaseUrl}?${params.toString()}`;
  }

  private getMeteoUrl(coordinates: Coordinates): string {
    if (!coordinates?.latitude || !coordinates?.longitude) {
      throw new Error('Niepełne dane współrzędnych.');
    }

    const params = new URLSearchParams({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current: 'temperature_2m',
    });

    return `${this.openMeteoBaseUrl}?${params.toString()}`;
  }
}

