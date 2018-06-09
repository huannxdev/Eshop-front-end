import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/filter';
import { delay } from 'rxjs/operators';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  idCategory: string;
  keyword: string;
  sort: string = "name";
  range: number[] = [0, 3000];
  newrange: number[] = [0, 3000];
  products: any[] = [];
  check: boolean = false;

  pageSize: number;
  page: number;
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
    this.productService.searchProductByIdCategory(this.idCategory, this.keyword, this.sort, this.range[0], this.range[1], this.pageSize, this.page)
      .subscribe(data => {
        this.spinner.turnOffSpinner();
        this.products = data.items;
        this.itemCount = data.totalItemCount;
        if (this.products.length == 0) this.check = true;
        else this.check = false;
      });
  }

  getPage(page: number) {
    if (this.page != page) {
      this.page = page;
      this.loadProducts();
    }
  }

  getPageSize(pageSize: number) {
    if (this.pageSize != pageSize) {
      this.pageSize = pageSize;
      this.loadProducts();
    }
  }

  changeSort() {
    this.page = 1;
    this.loadProducts();
  }

  changePrice() {
    if (this.range[0] != this.newrange[0] || this.range[1] != this.newrange[1]) {
      this.page = 1;
      this.loadProducts();
      this.newrange = this.range;
    }
  }

}
