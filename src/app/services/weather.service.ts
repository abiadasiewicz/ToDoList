import {Injectable} from '@angular/core';
import {mapGeocodingDataToCoordinates} from "../utils/weather-mappers";
import {WeatherApiService} from "./weather-api.service";
import {TodosService} from "./todos.service";
import {TodoConfig} from "../../todo-data";
import {map, switchMap, throwError, catchError, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(private weatherApi: WeatherApiService,
                private todosService: TodosService) {
    }

    updateTodoWithWeather(todo: TodoConfig): Observable<any> {
        if (!todo?.city) {
            return throwError(() => new Error('Lokalizacja nie istnieje.'));
        }

        return this.weatherApi.getCoordinates(todo.city).pipe(
            switchMap(data => this.processCoordinatesAndWeather(data))
        );
    }

    private processCoordinatesAndWeather(data: any): Observable<any> {
        if (!data?.results) {
            return throwError(() => new Error('Błędna lokalizacja: brak wyników dla miasta.'));
        }

        const coordinates = mapGeocodingDataToCoordinates(data);

        return this.weatherApi.getWeather(coordinates).pipe(
            map(weather => {
                const updatedTodo = {
                    ...coordinates,
                    temperature: weather.current.temperature_2m
                };

                this.todosService.editFirstTodo(updatedTodo);
                return updatedTodo;
            })
        );
    }
}
