import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductListComponent } from './product/product-list/product-list.component';

@Component({
  selector: 'app-root',
  imports: [ProductFilterComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'filterableProductSearchApp';
}
