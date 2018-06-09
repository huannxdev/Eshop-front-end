import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
content: string;
  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.configService.get().subscribe(data => {
      this.content = data.FaqHtml;
    });
  }

}
