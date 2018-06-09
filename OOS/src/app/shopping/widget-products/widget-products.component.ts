import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../models/product';

@Component({
  selector: 'app-widget-products',
  templateUrl: './widget-products.component.html',
  styleUrls: ['./widget-products.component.css']
})
export class WidgetProductsComponent implements OnInit {

  @Input() productList: ProductModel[];
  
  constructor() { }

  ngOnInit() {
    console.log(this.productList);
  }

}
