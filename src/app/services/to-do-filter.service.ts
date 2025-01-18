import {Injectable} from '@angular/core';
import {TodoConfig} from "../../todo-mocked-data";

@Injectable({
  providedIn: 'root'
})
export class ToDoFilterService {

//TODO jeśli miałoby być używane w większej ilości miejsc można się zastanowić nad zrobieniem tego w sposób generyczny,
// na potrzeby tej aplikacji nie sądzę by było to potrzebne
  filterValue(filterValue: string, todoData: TodoConfig[]): TodoConfig[] {
    const lowerCaseFilterValue = filterValue.toLowerCase();

    const filteredToDos = todoData.filter(toDo => {
      return (Object.keys(toDo) as (keyof TodoConfig)[]).some(key => {
        if (key === 'display') return false;

        const fieldValue = toDo[key]?.toString().toLowerCase();
        return fieldValue.includes(lowerCaseFilterValue);
      });
    });

    todoData.forEach(toDo => {
      toDo.display = filteredToDos.includes(toDo);
    });

    return filteredToDos;
  }
}
