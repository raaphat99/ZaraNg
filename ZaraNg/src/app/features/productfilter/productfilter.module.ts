import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductfilterRoutingModule } from './productfilter-routing.module'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductfilterRoutingModule ,
    HttpClientModule
  ]
})
export class ProductfilterModule { }
