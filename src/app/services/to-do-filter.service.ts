import {Injectable} from '@angular/core';
import {TodoConfig} from "../../todo-data";

@Injectable({
  providedIn: 'root'
})
export class ToDoFilterService {

//TODO jeśli miałoby być używane w większej ilości miejsc można się zastanowić nad zrobieniem tego w sposób generyczny,
// na potrzeby tej aplikacji nie jest to raczej potrzebne
  filterValue(filterValue: string, todoData: TodoConfig[]): TodoConfig[] {
    const lowerCaseFilterValue = filterValue.toLowerCase();

    return todoData.filter(toDo => {
      const todoKeys = Object.keys(toDo) as (keyof TodoConfig)[];
      const matchesFilter = todoKeys.some(key => {
        if (key === 'display') return false;

        const fieldValue = toDo[key]?.toString().toLowerCase();
        return fieldValue?.includes(lowerCaseFilterValue);
      });

      toDo.display = matchesFilter;

      return matchesFilter;
    });
  }
}
