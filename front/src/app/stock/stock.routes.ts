import { Routes } from '@angular/router';

export const stockRoutes: Routes = [
  {
    path: '',
    async loadComponent() {
      const m = await import('./list/list.component');
      return m.ListComponent;
    },
  },
  {
    path: 'create',
    async loadComponent() {
      const m = await import('./create/create.component');
      return m.CreateComponent;
    },
  },
];
