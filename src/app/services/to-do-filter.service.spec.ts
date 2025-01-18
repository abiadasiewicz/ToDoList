import {TestBed} from '@angular/core/testing';
import {ToDoFilterService} from './to-do-filter.service';
import {TodoConfig} from "../../todo-mocked-data";

describe('ToDoFilterService', () => {
  let service: ToDoFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoFilterService);
  });

  const mockedData: TodoConfig[] = [
    {
      date: '17.01.2024',
      location: 'Wroclaw',
      content: 'Zrobić zadanie od CCC',
      display: true
    },
    {
      date: '18.01.2024',
      location: 'Wroclaw',
      content: 'Nakaramić kota',
      display: true
    },
    {
      date: '16.01.2024',
      location: 'Polkowice',
      content: 'Zrobić zakupy',
      display: false
    },
  ]

  it('should filter by content and update display field', () => {
    const filtered = service.filterValue('zakupy', mockedData);

    expect(filtered.length).toBe(1);
    expect(filtered[0].content).toBe('Zrobić zakupy');
    expect(mockedData[0].display).toBeFalse();
    expect(mockedData[1].display).toBeFalse();
    expect(mockedData[2].display).toBeTrue();
  });

  it('should filter by location and update display field', () => {
    const filtered = service.filterValue('Wroc', mockedData);

    expect(filtered.length).toBe(2);
    expect(filtered[0].location).toBe('Wroclaw');
    expect(mockedData[0].display).toBeTrue();
    expect(filtered[1].location).toBe('Wroclaw');
    expect(mockedData[1].display).toBeTrue();
    expect(mockedData[2].display).toBeFalse();
  });

  it('should return an empty array if no match is found', () => {
    const filtered = service.filterValue('nonexistent', mockedData);

    expect(filtered.length).toBe(0);
    mockedData.forEach(toDo => {
      expect(toDo.display).toBeFalse();
    });
  });

  it('should be case-insensitive during filtering', () => {
    const filtered = service.filterValue('zAKupY', mockedData);

    expect(filtered.length).toBe(1);
    expect(filtered[0].content).toBe('Zrobić zakupy');
    expect(mockedData[0].display).toBeFalse();
    expect(mockedData[1].display).toBeFalse();
    expect(mockedData[2].display).toBeTrue();
  });

  it('should handle empty filter values and display all items', () => {
    const filtered = service.filterValue('', mockedData);

    expect(filtered.length).toBe(mockedData.length);
    mockedData.forEach(toDo => {
      expect(toDo.display).toBeTrue();
    });
  });

  it('should handle empty data array', () => {
    const filtered = service.filterValue('zakupy', []);

    expect(filtered.length).toBe(0);
  });
});
