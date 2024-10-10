import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { StoreService } from './services/store.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ],
  providers: [
    StoreService, 
    provideHttpClient(),
  ]
})
export class PaymentModule { }
