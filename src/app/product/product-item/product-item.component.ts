import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product.interface';
import { ProductStore } from '../service/product.store';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;

  title = new FormControl('');
  isEditing = false;

  constructor(private productStore: ProductStore) {}

  ngOnInit() {
    this.title.setValue(this.product.title);
  }

  edit() {
    this.isEditing = true;
    this.title.setValue(this.product.title);
  }

  cancel() {
    this.isEditing = false;
    this.title.setValue(this.product.title);
  }

  save() {
    if (this.title.value !== this.product.title) {
      this.productStore.updateProduct(this.product.id, {
        title: this.title.value || '',
      });
    }
    this.isEditing = false;
  }
}
