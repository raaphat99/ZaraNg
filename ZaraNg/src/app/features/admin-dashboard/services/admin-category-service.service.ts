import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  parentCategoryName?: string;
  parentCategoryId: number | null;
  description?: string;
  sizeTypeId: number | null;
  expanded?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AdminCategoryServiceService {

  private apiUrl = 'http://localhost:5250/api/Category'; 

  constructor(private http: HttpClient) {}

  getMainCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/main-categories`);
  }

  getSubCategories(parentId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/${parentId}/subcategories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<Category>(this.apiUrl, category ,{headers});
  }

  updateCategory(id: number, category: Category): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put<void>(`${this.apiUrl}/${id}`, category ,{headers});
  }

  deleteCategory(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {headers});
  }
}
