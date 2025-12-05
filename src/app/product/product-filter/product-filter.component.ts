import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductStore } from '../service/product.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent implements OnInit {
  store = inject(ProductStore);
  search = new FormControl('');

  constructor() {
    this.search.valueChanges.subscribe((value) => {
      this.store.filters.update((f) => ({ ...f, search: value ?? '' }));
    });
  }
  ngOnInit(): void {
    console.log('oninit');
  }
}
