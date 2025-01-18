export const todoData: TodoConfig[] = [
  {
    date: '17.01.2025',
    location: {
      city: 'Warszawa'
    },
    content: 'Zrobić zadanie od CCC',
    display: true
  },
  {
    date: '18.01.2025',
    location: {
      city: 'Wrocław'
    },
    content: 'Nakaramić kota',
    display: true
  },
  {
    date: '16.01.2025',
    location: {
      city: 'Polkowice'
    },
    content: 'Zrobić zakupy',
    display: false
  },
]

export interface TodoConfig {
  date: string;
  location: Location;
  content: string;
  display: boolean;
}

interface Location extends Coordinates {
  city: string;
}

export interface Coordinates {
  latitude?: string;
  longitude?: string;
}
