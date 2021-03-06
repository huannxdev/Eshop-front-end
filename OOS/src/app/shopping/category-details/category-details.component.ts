import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private spinner: SpinnerService) { }
  idCategory: string;
  products: any;
  keyword: string;
  sort: string = "name";
  range: number[] = [0, 3000];
  newrange: number[] = [0, 3000];
  check: boolean = false;

  pageSize: number;
  page: number;
  itemCount: number;
  pNow: number = 1;

  ngOnInit() {
    this.activatedRoute.params
      .filter(params => params.id)
      .subscribe(params => {
        this.idCategory = this.GetIdCategory(params.id);
        this.loadProducts();
      });
  }

  GetIdCategory(id: string) {
    return id.slice(0, id.indexOf("_"));
  }

  loadProducts() {
    this.spinner.startLoadingSpinner();
    this.productService.getByCategory(this.idCategory, this.sort, this.range[0], this.range[1], this.pageSize, this.page)
      .subscribe(data => {
        this.spinner.turnOffSpinner();
        this.products = data;
        if (this.products.length == 0) this.check = true;
        else this.check = false;
      });
  }

  changeSort() {
    this.sortListProduct();
  }

  changePrice() {
    if (this.range[0] != this.newrange[0] || this.range[1] != this.newrange[1]) {
      this.page = 1;
      this.loadProducts();
      this.newrange = this.range;
    }
  }

  sortListProduct(){
    if(this.sort =='name')
    this.products.sort(function(a,b){
      var nameA = a.Name.toUpperCase();
      var nameB = b.Name.toUpperCase();
      if(nameA < nameB){
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    if(this.sort=='price'){
      this.products.sort(function(a,b){
        if(a.MinPrice < b.MinPrice)
          return -1;
        if(a.MinPrice > b.MinPrice)
          return 1;
        return 0;
      });
    }
  }

}
