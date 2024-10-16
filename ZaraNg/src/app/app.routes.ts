import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { filter } from 'rxjs';
import { ProductfilterComponent } from './features/productfilter/components/productfilter/productfilter.component';
import { FiltersearchComponent } from './features/search/components/filtersearch/filtersearch.component';

export const routes: Routes = [

    {path: 'home', component: HomeComponent},

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'user',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
    },

    {
        path: 'auth',
        loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)  // Lazy load the user module
    },

    {
        path: 'products',
        loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) 
    },

    {
        path: 'payment',
        loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule) 
    },

    {
        path: 'shop',
        loadChildren: () => import('./features/shopping/shopping.module').then(m => m.ShoppingModule) 
    },

    {
        path: 'search',
        loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule) 
    },


    {
        path: 'help',
        loadChildren: () => import('./features/help/help.module').then(m => m.HelpModule) 
    },
    
    {
        path:'productfilter',
        loadChildren: () => import('./features/productfilter/productfilter.module').then(m => m.ProductfilterModule) 
    },

    {
        path:'search',
        loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule) 
    },
    {
        path:'filtersearch',
        component:FiltersearchComponent
    },
    { path: '**', component: NotFoundComponent }
];
