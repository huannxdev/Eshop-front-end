import { Component, OnInit } from '@angular/core';
import { OrdersModel, OrderStatus } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressModel } from '../../../models/address';
import { SpinnerService } from '../../../../shared/services/spinner.service';

@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.css']
})
export class OrderHistoryDetailComponent implements OnInit {

  order = new OrdersModel();
  id: number;
  status = OrderStatus;

  constructor(private router: Router,private spinnerService: SpinnerService, private orderService: OrderService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.spinnerService.startLoadingSpinner();
    let params: any = this.activatedRoute.snapshot.params;
    this.id = params.id;
    this.orderService.getOderDetails(this.id).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.order = data;
    });
  }

  delete() {
    this.spinnerService.startLoadingSpinner();
    this.orderService.delete(this.order.Id).subscribe(() => {
      this.spinnerService.turnOffSpinner();
      this.router.navigateByUrl("/account/order-history");
      console.log(this.order.Id);
    });
  }

}
