import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private geocodingBaseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private openMeteoBaseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private httpClient: HttpClient) {
  }

  // należałoby określić typ odbieranych danych, jednak zakładając, że public api może się zmienić zdecydowałem się tego nie robić
  getCoordinates(city: string): Observable<any> {
    return this.httpClient.get(this.getGeocodingUrl(city));
  }

  // jak wyżej
  getWeather(latitude: string, longitude: string): Observable<any> {
    return this.httpClient.get(this.getMeteoUrl(latitude, longitude));
  }

  private getGeocodingUrl(name: string): string {
    const params = new URLSearchParams({
      name,
      count: '10',
      language: 'pl',
      format: 'json'
    });

    return `${this.geocodingBaseUrl}?${params.toString()}`;
  }

  private getMeteoUrl(latitude: string, longitude: string): string {
    const params = new URLSearchParams({
      latitude,
      longitude,
      current: 'temperature_2m',
    });

    return `${this.openMeteoBaseUrl}?${params.toString()}`;
  }
}

