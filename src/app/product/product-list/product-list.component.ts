import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductStore } from '../service/product.store';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  store = inject(ProductStore);

  constructor() {
    this.store.loadMore();
  }

  @HostListener('window:scroll')
  onScroll() {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;

    if (bottom) this.store.loadMore();
  }
}
