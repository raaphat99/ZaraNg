import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeComponent } from './features/home/components/home/home.component';

export const routes: Routes = [

    {
        path: 'user',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)  // Lazy load the user module
    },

    // The ProductModule will only be loaded when a user navigates to a route that starts with /products
    {
        path: 'products',
        loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) // Lazy load the product module
    },

    {
        path: 'payment',
        loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule) // Lazy load the product module
    },

    {path: 'home', component: HomeComponent},

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: '**', component: NotFoundComponent }
];
