import { Component, AfterViewChecked, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrdersModel } from '../../models/order';
import { CartService } from '../../services/cart.service';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent {
  @Input() order: OrdersModel;
  constructor(private router: Router, private route: ActivatedRoute, private orderService: OrderService, private cartService: CartService) {
    cartService.paypalLoad.asObservable().subscribe(x => this.addScript = x);
  }

  addScript: boolean = false;
  total: number = 0;

  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox: 'AS_F2isdOalHFYG4JN-jeCXgZoGEVBqWFbNIoHYe5ZTGlm7Y9NenKKuplRxt_nhQ0OahWby92FlJYCjh',
      production: 'AXh5J33BEHGN1r78tGpnrpWzo00J4zMBGQEYWyThRNu4ZOYhbBURFfNqAb5jDXNKQ0A8xhjD2mWFnFlU'
    },
    commit: true,
    style: {
      size: 'small', // small | medium | large | responsive
      shape: 'rect',  // pill | rect
      tagline: false
    },
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.order.Total, currency: 'USD',
              },
              description: "Orient Online Shop Payment Description",
            },
          ]
        },
        experience: {
          input_fields: {
            no_shipping: 1
          }
        },
      });
    },

    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.order.Status = 1;
        this.orderService.add(this.order).subscribe(()=>{
          console.log("Authorized)");
          localStorage.removeItem("paymentMethod");
          localStorage.setItem("paymentMethod", "1");
          this.router.navigate(['../thankyou'], { relativeTo: this.route });
          this.cartService.clear();
        });
        //Do something when payment is successful.
      });
    }
  };

  addPaypalScript() {
    this.cartService.paypalLoad.next(true);
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
  renderButton() {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, 'paypal-checkout-btn');
      })
    }
    this.paypalConfig;
  }
}
