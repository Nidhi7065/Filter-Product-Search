import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductResponse } from '../model/product.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(params: {
    search: string;
    page: number;
    pageSize: number;
  }): Observable<ProductResponse> {
    const skip = params.page * params.pageSize;

    let httpParams = new HttpParams()
      .set('limit', params.pageSize)
      .set('skip', skip);

    if (params.search.trim().length > 0) {
      httpParams = httpParams.set('q', params.search);
      return this.http.get<ProductResponse>(`${this.base}/search`, {
        params: httpParams,
      });
    }

    return this.http.get<ProductResponse>(this.base, {
      params: httpParams,
    });
  }

  updateProduct(id: number, changes: Partial<Product>) {
    return this.http.put<Product>(`${this.base}/${id}`, changes, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
