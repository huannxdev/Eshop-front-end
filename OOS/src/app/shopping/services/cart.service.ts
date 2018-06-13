import { Injectable } from '@angular/core';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { ProductCartModel } from '../models/productCart';

@Injectable()
export class CartService {
  key = 'cart';
  private value = new Subject<CartModel[]>();
  paypalLoad = new Subject<boolean>();
  constructor() {
    this.paypalLoad.next(false);
  }

  get() {
    return this.value.asObservable();
  }
  init() {
    this.value.next(JSON.parse(localStorage.getItem(this.key)));
  }

  set(product: ProductCartModel, quantity: number) {
    var data = JSON.parse(localStorage.getItem(this.key));
    if (!data) data = [];
    if (!data.find(x => x.Product.Id == product.Id && x.Product.Color == product.Color && x.Product.Size == product.Size)) {
      var item = new CartModel();
      item.Product = product;
      item.Quantity = quantity;
      data.splice(0, 0, item);
      localStorage.setItem(this.key, JSON.stringify(data));
      this.value.next(data);
    }
    else {
      this.updateQuantity(product, data.find(x => x.Product.Id == product.Id && x.Product.Color == product.Color && x.Product.Size == product.Size).Quantity + quantity);
    }
  }

  remove(product: ProductCartModel) {
    var data = JSON.parse(localStorage.getItem(this.key));
    data = data.filter(x => !(x.Product.Id == product.Id && x.Product.Color == product.Color && x.Product.Size == product.Size));
    localStorage.setItem(this.key, JSON.stringify(data));
    this.value.next(data);
  }

  updateQuantity(product: ProductCartModel, quantity: number) {
    var data = JSON.parse(localStorage.getItem(this.key));
    data.filter(x => x.Product.Id == product.Id && x.Product.Color == product.Color && x.Product.Size == product.Size)[0].Quantity = quantity;
    localStorage.setItem(this.key, JSON.stringify(data));
    this.value.next(data);
  }

  count() {
    return JSON.parse(localStorage.getItem(this.key)).length();
  }

  clear() {
    localStorage.removeItem(this.key);
    this.init();
  }
}