import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { OrdersModel } from '../models/order';
import { SpinnerService } from '../../shared/services/spinner.service';
import { StatusOrder } from '../models/statusOrder';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  listOrders: Array<Object>
  listStatus = new Array<StatusOrder>()
  orderToDelete: OrdersModel;

  email: string ="";
  phone: string = "";
  itemCount: number;
  pNow: number = 1;
  orderId: string;
  constructor(
    private ordersService: OrdersService,
    private router: Router,

    private spinnerService: SpinnerService) {
    this.listStatus.push(new StatusOrder(0, "Confirming"))
    this.listStatus.push(new StatusOrder(1, "Confirmed"))
    this.listStatus.push(new StatusOrder(2, "Shipping"))
    this.listStatus.push(new StatusOrder(3, "Shipped"))

  }
  
  ngOnInit() {
    this.getOrderList();
  }

  getOrderList() {
    this.spinnerService.startLoadingSpinner();
    this.ordersService.getList(this.email, this.phone).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.listOrders = data;
      this.itemCount = this.listOrders.length;
    });
  }

  search() {
    this.getOrderList();
  }

  checkOdd(num: number)
  {
    if(num+1%2==0)
    {
      return false;
    }
    else{ return true}
  }

  

  get(orderId) {
    this.orderId = orderId;
  }

  delete() {
    this.spinnerService.startLoadingSpinner();
    this.ordersService.delete(this.orderId).subscribe(() => {
      this.spinnerService.turnOffSpinner();
      this.getOrderList();
    });
  }

  edit(order) {
    this.ordersService.sendData(order);
    this.router.navigateByUrl("/admin/manager/orders/edit/" + order.Id);

  }

  updateStatus(order: OrdersModel) {
    this.spinnerService.startLoadingSpinner();
    this.ordersService.getById(order.Id).subscribe(ord => {
      ord.Status = order.Status;
      this.ordersService.put(ord.Id, ord).subscribe(data => {
        this.spinnerService.turnOffSpinner();
        console.log(order.Status);
      });
    });

  }
}
