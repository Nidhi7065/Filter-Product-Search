import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../model/product.interface';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  filters = signal({ search: '' });
  page = 0;
  limit = 20;

  private lastSearch = '';
  private searchTimeout: any;

  constructor(private api: ProductService) {
    effect(() => {
      const currentSearch = this.filters().search;
      if (currentSearch !== this.lastSearch) {
        this.lastSearch = currentSearch;
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.startNewQuery(currentSearch);
        }, 300);
      }
    });
  }

  startNewQuery(search: string) {
    this.page = 0;
    this.products.set([]);
    this.total.set(0);
    this.loadMore();
  }

  loadMore() {
    if (
      this.loading() ||
      (this.products().length >= this.total() && this.total() !== 0)
    ) {
      return;
    }

    this.loading.set(true);

    this.api
      .getProducts({
        search: this.filters().search,
        page: this.page,
        pageSize: this.limit,
      })
      .subscribe({
        next: (response) => {
          this.products.set([...this.products(), ...response.products]);
          this.total.set(response.total);
          this.page++;
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Failed to load products:', err);
          this.loading.set(false);
        },
      });
  }

  updateProduct(id: number, updateDTO: Partial<Product>) {
    this.loading.set(true);
    this.api.updateProduct(id, updateDTO).subscribe({
      next: (updatedProduct) => {
        const updatedProducts = this.products().map((p) =>
          p.id === id ? updatedProduct : p,
        );
        this.products.set(updatedProducts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to update product:', err);
        this.loading.set(false);
      },
    });
  }
}
