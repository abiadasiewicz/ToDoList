import {Component, input, Signal} from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  location = input<string>();
  date = input<string>();
  content = input<string>();
}
