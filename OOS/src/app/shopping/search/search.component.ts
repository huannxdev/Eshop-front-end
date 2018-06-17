import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/filter';
import { delay } from 'rxjs/operators';
import { SpinnerService } from '../../shared/services/spinner.service';
import { ProductModel } from '../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  idCategory: string;
  keyword: string;
  sort: string = "name";
  range: number[] = [0, 1000000];
  newrange: number[] = [0, 100000];
  products_: ProductModel[] = [];
  products: any[] = [];
  check: boolean = false;


  itemCount: number;
  pNow: number = 1;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private spinner: SpinnerService) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .filter(params => params.cat)
      .filter(params => params.op)
      .subscribe(params => {
        this.idCategory = params.cat;
        this.keyword = params.op;
        this.loadProducts();
      });
  }

  loadProducts() {
    this.spinner.startLoadingSpinner();
    this.productService.searchProduct(this.idCategory, this.keyword)
      .subscribe(data => {
        this.spinner.turnOffSpinner();
        this.products_ = data;
        this.sortAndFiltePrice();
      });
  }
  sortAndFiltePrice(){
    this.products.splice(0,this.products.length);
    this.products_.forEach(element => {
      if (element.MinPrice>= this.range[0] && element.MinPrice<= this.range[1])
      this.products.push(element);
    });
    // this.sort

    if (this.products.length == 0) this.check = true;
    else this.check = false;
  }

  changePrice() {
    if (this.range[0] != this.newrange[0] || this.range[1] != this.newrange[1]) {
      this.newrange = this.range;
      this.sortAndFiltePrice();
    }
  }

}
