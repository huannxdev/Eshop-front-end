import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-shipping-return',
  templateUrl: './shipping-return.component.html',
  styleUrls: ['./shipping-return.component.css']
})
export class ShippingReturnComponent implements OnInit {
content: string;
  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.configService.get().subscribe(data => {
      this.content = data.ShippingReturnHtml;
    });
  }

}
