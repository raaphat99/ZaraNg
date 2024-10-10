import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)  // Lazy load the user module
      }
];
