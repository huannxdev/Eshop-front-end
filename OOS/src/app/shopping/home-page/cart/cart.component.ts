import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart';
import { normalizeSync } from 'normalize-diacritics';
import { Router } from '@angular/router';
import { Currency } from '../../models/configuration';
import { MetaDataService } from '../../services/meta-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartModel[] = [];
  total: number = 0;
  currency: number;
  public currencyDefine = Currency;
  constructor(private cartService: CartService, private router: Router,private metadataService: MetaDataService) {

  }

  ngOnInit() {
    this.get();
    this.metadataService.setCurrency();
    this.currency = this.metadataService.getCurrency();
  }

  get() {
    this.cartService.get().subscribe(x => {
      this.cart = x;
      if (!this.cart) {
        this.cart = [];
      }
      this.updateTotal();
    });
    this.cartService.init()
  }
  updateTotal() {
    var total = 0;
    this.cart.forEach(function (item) {
      total = total + item.Product.Price * item.Quantity;
    })
    this.total = total;
  }
  remove(product) {
    this.cartService.remove(product);
    this.updateTotal();
    event.stopPropagation();
  }
  routeProduct(name, id) {
    var nameProduct = normalizeSync(name);
    var path = "/product/" + id + "_" + this.transform(nameProduct);
    this.router.navigateByUrl(path);
  }
  transform(value: string) {
    let newvalue = value
      .replace(/Đ/g, 'D')
      .replace(/đ/g, 'd')
      .replace(/&/g, '')
      .replace(/\s/g, '_');

    return newvalue;
  }
}