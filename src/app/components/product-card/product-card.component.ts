import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../type/Product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!:Product;
  @Output() viewProductId = new EventEmitter<number>()
  view(){
    console.log(this.product.id);
    this.viewProductId.emit(this.product.id)
  }
}
