import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [

    // The ProductModule will only be loaded when a user navigates to a route that starts with /products
    {
        path: 'products',
        loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) // Lazy load the product module
    },

    {
        path: 'payment',
        loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule) // Lazy load the product module
    },

    { path: '', redirectTo: 'payment', pathMatch: 'full' },

    { path: '**', component: NotFoundComponent }
];
