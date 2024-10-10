import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../viewmodels/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  

  constructor(private productService: ProductService)  {
    
  }

  ngOnInit(): void {

    this.productService.generateProducts(500)
      .subscribe(products => this.products = products);
    // this.productService.getAll().subscribe(products => {
    //   this.products = products;
    // });
  }
}
