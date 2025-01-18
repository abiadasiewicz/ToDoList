import {Observable, of} from "rxjs";

export const todoData: TodoConfig[] = [
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
  },
]

export interface TodoConfig {
  date: string;
  location: string;
  content: string;
  display: boolean;
}
