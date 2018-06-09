import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  flag:boolean = true;
  id:string;
  product:any;
  constructor(private productService:ProductService) { }

  ngOnInit() {
      this.id=this.productService.idProduct;
      this.productService.get(this.id).subscribe(data =>{
      this.product = data;

      if(this.id==null)
      {
        this.flag=false;
      }

      });
  }
}