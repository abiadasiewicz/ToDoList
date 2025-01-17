import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  @Input() location: string | undefined;
  @Input({required: true}) date!: string;
  @Input({required: true}) content!: string;
}
