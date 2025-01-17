import { Component } from '@angular/core';
import {todoData} from "../../../../todo-mocked-data";
import {ToDoListItemComponent} from "../../common/to-do-list-item/to-do-list-item.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-to-do-list-page',
  standalone: true,
  imports: [
    ToDoListItemComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './to-do-list-page.component.html',
  styleUrl: './to-do-list-page.component.scss'
})
export class ToDoListPageComponent {
toDos = todoData;


}
