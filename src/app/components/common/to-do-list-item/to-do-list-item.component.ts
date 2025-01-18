import {Component, input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  location = input<string>();
  date = input<string>();
  content = input<string>();
  temperature = input<string>();
}
