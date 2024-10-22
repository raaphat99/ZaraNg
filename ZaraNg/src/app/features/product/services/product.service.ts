import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment.prod';
import { ProductVariant } from '../viewmodels/product-variant';
import { ProductImage } from '../viewmodels/product-image';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(httpClient: HttpClient) {
    super('http://localhost:5250/api/ProductAdmin', httpClient);
  }

  getProductVariants(productId: number): Observable<ProductVariant[]> {
    return this.httpClient.get<ProductVariant[]>(
      `${this.url}/${productId}/variants`
    );
  }

  getProductColors(productId: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.url}/${productId}/colors`);
  }

  getVariantImages(variantId: number): Observable<ProductImage[]> {
    return this.httpClient.get<ProductImage[]>(
      `http://localhost:5250/api/ProductImage/variants/${variantId}`
    );
  }

  getSizesBySizeType(sizeType: string): Observable<string[]> {
    let sizes: string[] = [];

    if (sizeType === 'Alpha') sizes = ['S', 'M', 'L', 'XL'];
    else if (sizeType === 'Numeric') sizes = ['36', '38', '40', '42', '44'];
    else if (sizeType === 'OneToSix')
      sizes = [
        '1½ years (86 cm)',
        '2 years (92 cm)',
        '3 years (98 cm)',
        '4 years (110 cm)',
        '5 years (116 cm)',
        '6 years (116 cm)',
      ];
    else if (sizeType === 'SevenToFourteen')
      sizes = [
        '6-7 years (120 cm)',
        '8-9 years (130 cm)',
        '9-10 years (140 cm)',
        '11-12 years (152 cm)',
        '13-14 years (164 cm)',
      ];
      
      return of(sizes);
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
