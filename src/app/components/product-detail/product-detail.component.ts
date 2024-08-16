import { Component, EventEmitter, input, OnInit, output, Output, signal } from '@angular/core';
import { IProduct } from '../../model/porduct/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class ProductDetailComponent implements OnInit {
  // Use the new input.required() method instead of @Input()
  product = input.required<IProduct | null>();

  // @Output() productUpdated = signal<IProduct | null>(null);

  @Output() productUpdated = new EventEmitter<IProduct | null>();

  constructor() {}

  ngOnInit() {}

  // Method to emit the product details
  emitProductUpdate() {
    // Emit the current product details via the output signal
    this.productUpdated.emit(this.product());
  }
}
