import { Component, OnInit } from '@angular/core';
import { StatusOrder } from '../../models/statusOrder';
import { OrdersModel, OrderStatus } from '../../models/order';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  listOrders: any;
  orderToDelete: OrdersModel;
  status = OrderStatus;

  email: string = "";
  phone: string = "";
  pageSize: number = 10;
  page: number = 1;

  itemCount: number;
  pNow: number = 1;
  constructor(
    private ss: AccountService,
    private ordersService: OrderService,
    private router: Router,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList() {
    this.spinnerService.startLoadingSpinner();
    var username;
    this.ss.getUserSession().subscribe(data => username = data.UserName);
    this.ss.setUserSession();
    this.ss.getByUserName(username).subscribe(data => {
      this.email = data.Email;
      this.ordersService.getList(this.email, this.phone, this.pageSize, this.page).subscribe(data => {
        this.spinnerService.turnOffSpinner();
        this.listOrders = data;
      });
    });
  }

  search() {
    this.getOrderList();
  }
}
