import {Injectable, Signal, signal} from '@angular/core';
import {TodoConfig, todoData} from "../../todo-mocked-data";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todoSignal = signal<TodoConfig[]>(todoData);

  getToDos(): Signal<TodoConfig[]> {
    return this.todoSignal;
  }

  addToDo(newToDo: TodoConfig): void {
    this.todoSignal.update((todos) => [...todos, newToDo]);
  }

  editFirstTodo(valuesToUpdate: Partial<TodoConfig>) {
    this.editTodo(0, valuesToUpdate);
  }

  private editTodo(index: number, valuesToUpdate: Partial<TodoConfig>): void {
    this.todoSignal.update((todos) =>
      todos.map((todo, i) =>
        i === index ? {...todo, ...valuesToUpdate} : todo
      )
    );
  }
}
