import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filteredValue = new EventEmitter<string>();
  destroy$ = new Subject<void>();
  filterForm = new FormGroup({
    filterAll: new FormControl<string>('')
  });

  ngOnInit() {
    this.filterForm.controls['filterAll'].valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((formData) => {
        formData ? this.filteredValue.emit(formData) : this.filteredValue.emit('');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
