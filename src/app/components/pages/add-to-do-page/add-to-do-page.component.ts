import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {dateValidator} from "../../../utils/date-validator";
import {TodoConfig} from "../../../../todo-mocked-data";
import {TodosService} from "../../../services/todos.service";

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

  constructor(private fb: FormBuilder, private todosService: TodosService) {
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

  submit(): void {
    this.addToDoForm.markAllAsTouched();
    if (this.addToDoForm.valid) {
      const newToDo: TodoConfig = this.getFormData();
      this.todosService.addToDo(newToDo);
      this.addToDoForm.reset();
    }
  }

  private getFormData(): TodoConfig {
    return {
      ...this.addToDoForm.value,
      display: true,
    };
  }
}
