import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  Paypal: boolean = false;
  Bank: boolean = false;
  COD: boolean = false;
  methodPayment: number = 0;

  ngOnInit() {
    this.methodPayment = Number(localStorage.getItem("paymentMethod"));
    localStorage.removeItem("paymentMethod");
    if (this.methodPayment == 0)
      this.router.navigate(['../payment'], { relativeTo: this.route });
    this.hide();
  }

  hide() {
    if (this.methodPayment == 1) {
      this.Paypal = true;
    }
    if (this.methodPayment == 2) {
      this.Bank = true;
    }
    if (this.methodPayment == 3) {
      this.COD = true;
    }
  }

}
