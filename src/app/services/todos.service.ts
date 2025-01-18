import {Injectable, Signal, signal} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TodoConfig, todoData} from "../../todo-mocked-data";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todoSignal = signal<TodoConfig[]>([
    {
      date: '17.01.2025',
      location: 'Wroclaw',
      content: 'Zrobić zadanie od CCC',
      display: true
    },
    {
      date: '18.01.2025',
      location: 'Wroclaw',
      content: 'Nakaramić kota',
      display: true
    },
    {
      date: '16.01.2025',
      location: 'Polkowice',
      content: 'Zrobić zakupy',
      display: false
    }
  ]);

  getToDos(): Signal<TodoConfig[]> {
    return this.todoSignal;
  }

  addToDo(newToDo: TodoConfig): void {
    this.todoSignal.update((todos) => [...todos, newToDo]);
  }
}
