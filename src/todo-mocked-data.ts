
export const todoData: TodoConfig[]=[
  {
    date: '2024-01-17',
    location: 'Wroclaw',
    content: 'Zrobić zadanie od CCC',
    display: true
  },
  {
    date: '2024-01-17',
    location: 'Wroclaw',
    content: 'Nakaramić kota',
    display: true
  },
  {
    date: '2024-01-17',
    location: 'Wroclaw',
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
