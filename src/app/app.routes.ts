import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'to-do-list',
    pathMatch: 'full',
  }, {
    path: 'to-do-list',
    loadComponent: () => import('./pages/to-do-list-page/to-do-list-page.component').then(c => c.ToDoListPageComponent)
  }, {
    path: 'add-to-do',
    loadComponent: () => import('./pages/add-to-do-page/add-to-do-page.component').then(c => c.AddToDoPageComponent)
  }, {
    //TODO tutaj powinno być przekierowanie do strony Page Not Found
    path: '**',
    loadComponent: () => import('./pages/to-do-list-page/to-do-list-page.component').then(c => c.ToDoListPageComponent)
  },
];
