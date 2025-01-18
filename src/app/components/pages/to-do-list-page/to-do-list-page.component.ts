import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {TodoConfig} from "../../../../todo-mocked-data";
import {ToDoListItemComponent} from "../../common/to-do-list-item/to-do-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {FilterComponent} from "../../common/filter/filter.component";
import {ToDoFilterService} from "../../../services/to-do-filter.service";
import {TodosService} from "../../../services/todos.service";
import {WeatherApiService} from "../../../services/weather-api.service";
import {mapGeocodingDataToCoordinates} from "../../../utils/weather-mappers";
import {AlertComponent} from "../../common/alert/alert.component";
import {EMPTY, map, switchMap} from "rxjs";

@Component({
  selector: 'app-to-do-list-page',
  standalone: true,
  imports: [
    ToDoListItemComponent,
    NgForOf,
    NgIf,
    FilterComponent,
    AlertComponent
  ],
  templateUrl: './to-do-list-page.component.html',
  styleUrls: ['./to-do-list-page.component.scss']
})
export class ToDoListPageComponent implements OnInit {
  toDos!: Signal<TodoConfig[]>;
  showLocationError = signal(false);

  constructor(private toDoFilterService: ToDoFilterService,
              private todosService: TodosService,
              private weatherApiService: WeatherApiService) {
  }

  ngOnInit() {
    this.toDos = this.todosService.getToDos();
    this.handleFirstTodo();
  }

  onFilteredValueChange(value: string): void {
    this.toDoFilterService.filterValue(value.toLowerCase(), this.toDos());
  }

  hideLocationError() {
    this.showLocationError.set(false);
  }

  private handleFirstTodo() {
    const firstTodo = this.toDos()[0];

    if (!firstTodo?.location?.city) {
      this.showLocationError.set(true);
      return;
    }

    this.weatherApiService.getCoordinates(firstTodo.location.city)
      .pipe(
        switchMap(data => this.processCoordinates(data, firstTodo))
      )
      .subscribe({
        next: ({coordinates, weather}) => this.updateTodoWithWeather(firstTodo, coordinates, weather),
        error: () => this.showLocationError.set(true)
      });
  }

  private processCoordinates(data: any, firstTodo: TodoConfig) {
    if (!data?.results) {
      this.showLocationError.set(true);
      return EMPTY;
    }

    const coordinates = mapGeocodingDataToCoordinates(data);

    this.todosService.editFirstTodo({
      location: {
        ...firstTodo.location,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }
    });

    return this.weatherApiService.getWeather(coordinates.latitude, coordinates.longitude).pipe(
      map(weather => ({coordinates, weather}))
    );
  }

  private updateTodoWithWeather(firstTodo: TodoConfig, coordinates: any, weather: any) {
    this.todosService.editFirstTodo({
      location: {
        ...firstTodo.location,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      },
      temperature: weather.current.temperature_2m
    });
  }
}
