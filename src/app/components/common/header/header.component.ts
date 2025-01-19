import {Component, computed, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGhost} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {TodosService} from "../../../services/todos.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly faGhost = faGhost;
  isMobileMenuOpen = false;

  numberOfTodos = computed(() => {
    const todos = this.todoService.getToDos()();
    return todos.filter(todo => dayjs(todo.date, 'DD.MM.YYYY').isSameOrAfter(dayjs(), 'day')).length;
  });

  constructor(private todoService: TodosService) {
  }

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
