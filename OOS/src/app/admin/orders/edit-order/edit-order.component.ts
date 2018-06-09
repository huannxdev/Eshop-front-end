import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounce } from 'rxjs/operator/debounce';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { OrderComponent } from '../../../shopping/order/order.component';
import { OrdersService } from '../../services/orders.service';
import { AddressModel } from '../../models/Address';
import { OrderDetailModel } from '../../models/OrderDetail';
import { OrdersModel } from '../../models/order';
import { ProductModel } from '../../models/product';
import { ProductService } from '../../services/Product.service';
import { BreadcrumbService } from 'long-ng5-breadcrumb';
import { SpinnerService } from '../../../shared/services/spinner.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: OrdersModel
  id: string
  detailDelete: OrderDetailModel
  saved = true

  //Search product for order details
  private searchTerms = new Subject<string>();
  listProduct: Observable<ProductModel[]>;
  searchResult: string = '';
  choosedProduct: ProductModel;

  constructor(private breadcrumbService:BreadcrumbService, private ss: OrdersService, private productService: ProductService, private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService) { }

  search(term: string): void {
    this.searchTerms.next(term);
    console.log("A:"+term+"B:"+this.searchResult);
  }

  chooseProduct(product: ProductModel) {
    this.searchResult = '';
    this.choosedProduct = product;
    // this.listProduct.isEmpty;
    let indexMatch = this.indexDetailMatch(product.Id)
    if (indexMatch > -1) {
      this.order.OrderDetails[indexMatch].Quantity += 1
      let quantity = this.order.OrderDetails[indexMatch].Quantity
      let price = this.order.OrderDetails[indexMatch].Price
      this.order.OrderDetails[indexMatch].TotalPrice = quantity * price
    }
    else {
      let detail: OrderDetailModel = {
        IdProduct: product.Id,
        NameProduct: product.Name,
        Quantity: 1,
        // price: product.price,
        // totalPrice: product.price,
        Price: 0,
        TotalPrice: 0,
        Code: product.Code
      }
      this.order.OrderDetails.push(detail)
    }
    this.calculateTotalOrder()
    this.search("");
    this.searchResult = ""

  }

  indexDetailMatch(id: string) {
    for (let d of this.order.OrderDetails) {
      if (d.IdProduct == id) {
        let index = this.order.OrderDetails.indexOf(d, 0)
        return index;
      }
    }
    return -1;
  }

  ngOnInit() {

    this.listProduct = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(50),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProduct(term)),
    );

    let params: any = this.activatedRoute.snapshot.params;
    console.log("EditOrder params =", params)
    this.id = params.id
    this.spinnerService.startLoadingSpinner()
    this.ss.getById(this.id).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      console.log("EditOrder data =", data);
      this.order = data
      console.log("EditOrder order =", this.order);
    });
    this.breadcrumbService.addFriendlyNameForRouteRegex('/admin/manager/orders/edit/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}', this.displayNameForOrder());
  }

  displayNameForOrder(){
    var order = this.ss.getData();
    return "ID Bill: " + order.IdBill;
  }

  edit() {
    this.spinnerService.startLoadingSpinner()

    this.ss.put(this.id, this.order).subscribe(data => {
      this.spinnerService.turnOffSpinner();

      this.saved = true
      console.log("EditOrder edit data =" + data)
    }
    )
  }

  setBackSaved() {
    this.saved = false
  }

  updateTotal(orderDetail: OrderDetailModel) {
    console.log("Edit updateTotal")
    orderDetail.TotalPrice = orderDetail.Price * orderDetail.Quantity
    this.calculateTotalOrder()
  }

  delete() {
    var index = this.order.OrderDetails.indexOf(this.detailDelete, 0);
    if (index > -1) {
      this.order.OrderDetails.splice(index, 1);
    }
    this.calculateTotalOrder()
  }

  calculateTotalOrder() {
    let total = 0
    for (let d of this.order.OrderDetails) {
      total += d.TotalPrice
    }
    this.order.Total = total

  }

  setDetailDelete(orderDetail) {
    this.detailDelete = orderDetail
  }

}
