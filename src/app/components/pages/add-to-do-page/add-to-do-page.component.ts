import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {dateValidator} from "../../../utils/date-validator";
import {TodoConfig, todoData} from "../../../../todo-mocked-data";

@Component({
  selector: 'app-add-to-do-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-to-do-page.component.html',
  styleUrl: './add-to-do-page.component.scss'
})
export class AddToDoPageComponent {
  addToDoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addToDoForm = this.fb.group({
      content: ['', Validators.required],
      date: ['', [Validators.required, dateValidator]],
      location: ['', Validators.required],
    })
  }

  isControlInvalid(formControlName: string): boolean {
    const control = this.addToDoForm.get(formControlName);
    return !!(control?.touched && control?.invalid);
  }

  submit() {
    this.addToDoForm.markAllAsTouched();
    if (this.addToDoForm.valid) {
      todoData.push(this.getFormData());
      this.addToDoForm.reset();
    }
  }

  private getFormData(): TodoConfig {
    return {
      content: this.addToDoForm.get('content')?.value ?? '',
      date: this.addToDoForm.get('date')?.value ?? '',
      location: this.addToDoForm.get('location')?.value ?? '',
      display: true
    }
  }
}
