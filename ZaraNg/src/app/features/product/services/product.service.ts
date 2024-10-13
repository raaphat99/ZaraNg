import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../viewmodels/product';
import { of } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  private apiUrl: string = environment.apiUrl;

  constructor(httpClient: HttpClient) {
    super("http://localhost:5250/api/products", httpClient);
  }
  
  // generateProducts(count: number):  Observable<Product[]> {
  //   const products: Product[] = [];
  //   const baseNames = ["T-SHIRT", "JEANS", "JACKET", "SHOES", "HAT", "SCARF", "GLOVES", "SOCKS", "BELT", "SUNGLASSES"];
  //   const baseDescriptions = [
  //     "Regular fit with a round neckline and short sleeves.",
  //     "Slim fit with a button closure.",
  //     "Warm and comfortable with a hood.",
  //     "Stylish and comfortable for everyday wear.",
  //     "Adjustable and fits all sizes.",
  //     "Soft and warm for winter.",
  //     "Perfect for keeping your hands warm.",
  //     "Comfortable and durable.",
  //     "Adjustable and stylish.",
  //     "UV protection and stylish."
  //   ];
  
  //   for (let i = 0; i < count; i++) {
  //     const name = `BASIC MEDIUM WEIGHT ${baseNames[i % baseNames.length]}`;
  //     const description = baseDescriptions[i % baseDescriptions.length];
  //     const price = (Math.random() * 100).toFixed(2);
  //     const stockQuantity = Math.floor(Math.random() * 100) + 1;
  //     const created = new Date();
  //     const imageUrl = `https://picsum.photos/200?random=${i}`;
  //     products.push({ name, description, price: parseFloat(price), stockQuantity, imageUrl, created });
  //   }
  
  //   return of(products);
  // }
  
}
