import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProService extends ApiService {

  constructor(httpClient: HttpClient) { 
    super("http://localhost:5250/api/Products", httpClient);
  }
  add(resource: any) {
    const formattedData = {
        id: 0,  // إذا كنت تريد أن تبدأ من 0
        name: resource.name || '',
        description: resource.description || '',
        price: resource.price || 0,
        stockQuantity: resource.stockQuantity || 0,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        categoryId: resource.categoryId || 0,
        categoryName: resource.categoryName ,
        mainImageUrl: resource.mainImageUrl || '',
        filterName: resource.filterName || ['string']
    };
    
    return this.httpClient.post<any>(this.url, formattedData);
}
editproduct(resource: any, id: number) {
  const formattedData = {
      id: id,  // استخدم id المرسل هنا بدلاً من 0
      name: resource.name || '',
      description: resource.description || '',
      price: resource.price || 0,
      stockQuantity: resource.stockQuantity || 0,
      created: resource.created || new Date().toISOString(),
      updated: new Date().toISOString(),  // استخدم الوقت الحالي للتعديل
      categoryId: resource.categoryId || 0,
      categoryName: resource.categoryName || '',
      mainImageUrl: resource.mainImageUrl || '',
      filterName: resource.filterName || ['string']
  };

  return this.httpClient.put<any>(`${this.url}/${id}`, formattedData);

}

deactivateProduct(productId: number): Observable<void> {
  return this.httpClient.put<void>(`http://localhost:5250/api/Products/deactivate/${productId}`, {});
}
deactivateProductV(productId: number): Observable<void> {
  return this.httpClient.put<void>(`http://localhost:5250/api/Products/deactivateVariant/${productId}`, {});
}
add2(resource: any) {
  const formattedData = {
    id: 0,
    productId: resource.productId || 0,
    price: resource.price || 0,
    stockQuantity: resource.stockQuantity || 0,
    productColor: resource.productColor || '',
    productMaterial: resource.productMaterial||'',
    sizeId: resource.sizeId || 0
  };
  return this.httpClient.post<any>(`${this.url}`, formattedData);
}
edit(resource: any) {
  const formattedData = {
    id: resource.id || 0,  // استخدام id الصحيح
    productId: resource.productId || 0,
    price: resource.price || 0,
    stockQuantity: resource.stockQuantity || 0,
    productColor: resource.productColor || '',
    productMaterial: resource.productMaterial || '',
    sizeId: resource.sizeId || 0
  };

  // تأكد من أن الـ URL لا يحتوي على "/" إضافية
  return this.httpClient.put<any>(`${this.url}/${resource.id}`, formattedData);
}
uploadImage(file: File, variantId: number): Observable<any> {
  const formData = new FormData();
  formData.append('file', file, file.name); // إضافة الملف إلى FormData

  return this.httpClient.post<any>(`${this.url}/${variantId}`, formData);
}

  // دالة لحذف منتج

}
