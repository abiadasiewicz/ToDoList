import {Component, OnInit, Signal, signal} from '@angular/core';
import {TodoConfig} from "../../../../todo-data";
import {ToDoListItemComponent} from "../../common/to-do-list-item/to-do-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {FilterComponent} from "../../common/filter/filter.component";
import {ToDoFilterService} from "../../../services/to-do-filter.service";
import {TodosService} from "../../../services/todos.service";
import {WeatherService} from "../../../services/weather.service";
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
  templateUrl: './to-do-list-page.component.html',
  styleUrls: ['./to-do-list-page.component.scss']
})
export class ToDoListPageComponent implements OnInit {
  toDos!: Signal<TodoConfig[]>;
  showLocationError = signal(false);

  constructor(private toDoFilterService: ToDoFilterService,
              private todosService: TodosService,
              private weatherService: WeatherService) {
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

    if (!firstTodo?.city) {
      this.showLocationError.set(true);
      return;
    }

    this.weatherService.updateTodoWithWeather(firstTodo)
      .subscribe({
        next: () => {
        },
        error: () => {
          this.showLocationError.set(true)
        }
      });
  }
}
