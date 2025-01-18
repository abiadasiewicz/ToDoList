import {Component, OnInit, Signal} from '@angular/core';
import {TodoConfig} from "../../../../todo-mocked-data";
import {ToDoListItemComponent} from "../../common/to-do-list-item/to-do-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {FilterComponent} from "../../common/filter/filter.component";
import {ToDoFilterService} from "../../../services/to-do-filter.service";
import {TodosService} from "../../../services/todos.service";

@Component({
  selector: 'app-to-do-list-page',
  standalone: true,
  imports: [
    ToDoListItemComponent,
    NgForOf,
    NgIf,
    FilterComponent
  ],
  templateUrl: './to-do-list-page.component.html',
  styleUrl: './to-do-list-page.component.scss'
})
export class ToDoListPageComponent implements OnInit {
  toDos!: Signal<TodoConfig[]>;

  constructor(private toDoFilterService: ToDoFilterService, private todosService: TodosService) {
  }

  ngOnInit() {
    this.toDos = this.todosService.getToDos();
  }

  onFilteredValueChange(value: string): void {
    this.toDoFilterService.filterValue(value.toLowerCase(), this.toDos());
  }
}
