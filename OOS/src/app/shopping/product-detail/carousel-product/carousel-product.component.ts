import { Component, OnInit,Input } from '@angular/core';
import { BannerModel } from '../../models/banner';
@Component({
  selector: 'app-carousel-product',
  templateUrl: './carousel-product.component.html',
  styleUrls: ['./carousel-product.component.css']
})
export class CarouselProductComponent implements OnInit {

  @Input() listBanners: BannerModel[]

  constructor() {
  }

  ngOnInit() {

  }

}
