export const todoData: TodoConfig[] = [
    {
        date: '17.01.2025',
        city: 'Warszawa',
        content: 'Zrobić zadanie od CCC',
        display: true
    },
    {
        date: '21.01.2025',
        city: 'Wrocław',
        content: 'Nakaramić kota',
        display: true
    },
    {
        date: '16.01.2025',
        city: 'Polkowice',
        content: 'Zrobić zakupy',
        display: false
    },
]

export interface TodoConfig extends Coordinates {
    date: string;
    city: string;
    temperature?: string;
    content: string;
    display: boolean;
}

export interface Coordinates {
    latitude?: string;
    longitude?: string;
}
