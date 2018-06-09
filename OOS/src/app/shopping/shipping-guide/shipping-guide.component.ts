import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-shipping-guide',
  templateUrl: './shipping-guide.component.html',
  styleUrls: ['./shipping-guide.component.css']
})
export class ShippingGuideComponent implements OnInit {
content: string;
  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.configService.get().subscribe(data => {
      this.content = data.ShippingGuideHtml;
    });
  }

}
