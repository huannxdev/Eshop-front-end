import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {
  step: number = 1;
  listtitle: string[] = ["Cart Review", "Payment", "Thank You"];
  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof ChildActivationEnd) {
        this.route.firstChild.data.subscribe(data => {
          this.step = data['step'];
        });
      }
    });
  }

  ngOnInit() {
  }

}