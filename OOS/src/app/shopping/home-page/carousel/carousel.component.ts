import { Component, OnInit, Input } from '@angular/core';
import { BannerModel } from '../../models/banner';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() listBanners: BannerModel[]

  constructor() {
  }

  ngOnInit() {

  }

}
