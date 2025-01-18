import {Component} from '@angular/core';
import {TodoConfig, todoData} from "../../../../todo-mocked-data";
import {ToDoListItemComponent} from "../../common/to-do-list-item/to-do-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {FilterComponent} from "../../common/filter/filter.component";
import {ToDoFilterService} from "../../../services/to-do-filter.service";

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
export class ToDoListPageComponent {
  toDos: TodoConfig[] = todoData;

  constructor(private toDoFilterService: ToDoFilterService) {
  }

  onFilteredValueChange(value: string): void {
    this.toDoFilterService.filterValue(value.toLowerCase(), this.toDos);
  }
}
