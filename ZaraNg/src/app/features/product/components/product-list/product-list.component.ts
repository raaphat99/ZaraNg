import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../viewmodels/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[] = [];
  hideFilters: boolean = false;
  isProductListingPage: boolean = true; // Set true only for product listing page

  constructor(private productService: ProductService)  {
    
  }

  ngOnInit(): void {

    // this.productService.generateProducts(500)
    //   .subscribe(products => this.products = products);

    // this.productService.getAll().subscribe(products => {
    //   this.products = products;
    // });
  }


}
