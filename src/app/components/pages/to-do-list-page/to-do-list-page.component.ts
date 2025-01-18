import {Component, OnInit, signal, Signal} from '@angular/core';
import {TodoConfig} from "../../../../todo-mocked-data";
import {ToDoListItemComponent} from "../../common/to-do-list-item/to-do-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {FilterComponent} from "../../common/filter/filter.component";
import {ToDoFilterService} from "../../../services/to-do-filter.service";
import {TodosService} from "../../../services/todos.service";
import {WeatherApiService} from "../../../services/weather-api.service";
import {HttpClient} from "@angular/common/http";
import {mapGeocodingDataToCoordinates} from "../../../utils/weather-mappers";
import {AlertComponent} from "../../common/alert/alert.component";

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
  providers: [HttpClient],
  templateUrl: './to-do-list-page.component.html',
  styleUrl: './to-do-list-page.component.scss'
})
export class ToDoListPageComponent implements OnInit {
  toDos!: Signal<TodoConfig[]>;
  showLocationError = signal<boolean>(false);

  constructor(private toDoFilterService: ToDoFilterService,
              private todosService: TodosService,
              private weatherApiService: WeatherApiService) {
  }

  ngOnInit() {
    this.toDos = this.todosService.getToDos();
    const firstTodo = this.toDos()[0];

    this.weatherApiService.getCoordinates(firstTodo.location.city).subscribe(data => {
      if (data?.results) {
        const coordinates = mapGeocodingDataToCoordinates(data);

        this.todosService.editFirstTodo({
          location: {
            ...firstTodo.location,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }
        });
      } else {
        this.showLocationError.set(true);
      }
    });
  }

  onFilteredValueChange(value: string): void {
    this.toDoFilterService.filterValue(value.toLowerCase(), this.toDos());
  }

  hideLocationError() {
    this.showLocationError.set(false);
  }
}
