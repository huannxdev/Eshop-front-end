import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrdersModel } from '../models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderIsExist: boolean = true;
  order: OrdersModel;
  constructor(private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    let params: any = this.activatedRoute.snapshot.params;
    let idOrder = this.activatedRoute.snapshot.params.id;
    this.orderService.getOderDetails(idOrder).subscribe(data => {
      if (data.Id == null) {
        this.orderIsExist = false;
        return;
      }
      this.order = data;
      console.log(this.order.OrderDetails)
  })
  }

}
