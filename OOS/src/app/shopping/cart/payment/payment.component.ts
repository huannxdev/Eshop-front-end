import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrdersModel } from '../../models/order';
import { OrderDetailModel } from '../../models/OrderDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressModel } from '../../models/address';
import { CartService } from '../../services/cart.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../../services/account.service';

declare var google: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public total: number = 0;
  public shippingFee: number = 0;
  public order = new OrdersModel();
  @ViewChild('paypal') paypal;
  paymentMethod: number = 1;

  constructor(private orderService: OrderService,
    private router: Router, private cartService: CartService, private spinner: SpinnerService, private route: ActivatedRoute, private ss : AccountService) {
  }
  get() {
    var total = 0;
    this.cartService.get().subscribe(x => {
      this.order.OrderDetails = [];
      if (x) {
        x.forEach(value => {
          var detail = new OrderDetailModel;
          detail.IdProduct = value.Product.Id;
          detail.NameProduct = value.Product.Name;
          detail.Price = value.Product.Price;
          detail.Quantity = value.Quantity;
          total += detail.TotalPrice = detail.Price * detail.Quantity;
          detail.Color = value.Product.Color;
          detail.Size = value.Product.Size;
          this.order.OrderDetails.push(detail);
        })
      }
    });
    this.cartService.init()
    this.order.Total = total;
    this.total = total;
  }

  ngOnInit() {
    this.spinner.startLoadingSpinner();
    this.order.OrderDetails = [];
    this.get();
    if (this.order.OrderDetails.length == 0)
      this.router.navigate(['/cart']);
    this.order.Address = [];
    this.order.Address.push(new AddressModel());
    this.order.Address[0].Type = 0;
    this.order.Address.push(new AddressModel());
    this.order.Address[1].Type = 1;
    this.paypal.renderButton();
    this.spinner.turnOffSpinner();
  }

  Checkout() {
    this.order.Status = 0;
    var username;
    this.ss.getUserSession().subscribe(data => username = data.UserName);
    this.ss.setUserSession();
    this.order.UserId = username;
    this.orderService.add(this.order).subscribe(() => {
      localStorage.removeItem("paymentMethod");
      localStorage.setItem("paymentMethod", this.paymentMethod.toString());
      this.router.navigate(['../thankyou'], { relativeTo: this.route });
      this.cartService.clear();
    });
  }

  useShippingAddress() {
    this.order.Address[1] = this.order.Address[0];
  }



  addDistance() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var onChangeHandler = function () {
      this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('reloadMap').addEventListener('click', onChangeHandler);

    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: '364 Cong Hoa',
      destination: 'quan ' + this.order.Address[0].District,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        //get direction info
        var htmlReturn = '';
        var route = response.routes[0];
        var money = 2 * route.legs[0].distance.value;    
        this.shippingFee = money;
        this.order.Total = this.total + money;
        htmlReturn += "Distance: <strong>" + route.legs[0].distance.text + "</strong>";
        htmlReturn += ", Tiền ship của bạn là: <strong>" + money + "</strong> VNĐ";
        document.getElementById('infoDirections').innerHTML = htmlReturn;

      } else {
        var htmlReturn = '';
        var route = response.routes[0];
        htmlReturn = "Dia chi nay khong ton tai";
        this.shippingFee = 0;
        this.order.Total = this.total + money;
        document.getElementById('infoDirections').innerHTML = htmlReturn;
      }
    });
  }

  onBlurMethod() {
    this.addDistance();
  }
}
