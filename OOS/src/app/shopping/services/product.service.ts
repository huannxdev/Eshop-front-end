
import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service'
import { Observable } from 'rxjs/Observable';
import { ProductModel } from '../models/product';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operator/map';
import { Subject } from 'rxjs';
import { timeout } from 'q';
import { PagingModel } from '../models/paging';

@Injectable()
export class ProductService {
  private API_PATH = 'http://fbinterns.azurewebsites.net/api/Product/';

  idProduct: string;
  constructor(private authHttpService: AuthHttpService) { }

  get(id): Observable<ProductModel> {
    return this.authHttpService.get(this.API_PATH + id).map(res => res.json() || []);
  }

  delete(id): Observable<any> {
    return this.authHttpService.delete(this.API_PATH + id);
  }

  setId(id) {
    this.idProduct = id;
  }

  gets(): Observable<ProductModel[]> {
    return this.authHttpService.get(this.API_PATH)
      //.map(res => res.json() || []);
      .map(res => res.json());
  }

  postProduct(product) {
    return this.authHttpService.post(this.API_PATH, product);
  }

  putProduct(task: ProductModel): Observable<any> {
    return this.authHttpService.put(this.API_PATH + "/" + task.Id, task);
  }

  getProductsByParameter(widgetName: string): Observable<ProductModel[]> {
    // let listProduct = new Subject<ProductModel[]>();
    // setTimeout(() => {
    //   listProduct.next([
    //       { id: "0", name: "product 0", price: 1, description: "", image:"",idCategory:"" },
    //       { id: "0", name: "product 1", price: 1, description: "", image:"",idCategory:"" },
    //       { id: "0", name: "product 2", price: 1, description: "", image:"",idCategory:"" },
    //       { id: "0", name: "product 3", price: 1, description: "", image:"",idCategory:"" },
    //   ])
    // }, 500);
    //return listProduct;
    return this.authHttpService.get(this.API_PATH + widgetName + "/widget").map(res => res.json() || []);
  }

  getByCategory(idCategory: string, sort: string, minPrice: number, maxPrice: number, pageSize: number, page: number) {
    var path = this.API_PATH + idCategory + "/category?" + "&Sort=" + sort + "&MinInPrice=" + minPrice + 
    "&MaxInPrice=" + maxPrice + "&PageSize=" + pageSize + "&Page=" + page;
    return this.authHttpService.get(path).map(res => res.json() || []);
  }


  searchProduct(idCategory: string, keyword: string): Observable<ProductModel[]> {
    if (!keyword.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var path = this.API_PATH + idCategory + "&" + keyword + "/searchproduct";
    return this.authHttpService.get(path).map(res => res.json() || []);
  }

  searchProductByIdCategory(idCategory: string, keyword: string, sort: string, minPrice: number, maxPrice: number, pageSize: number, page: number): Observable<PagingModel> {
    if (!keyword.trim()) {
      // if not search term, return empty array.
      return of();
    }
    var path = this.API_PATH + "/search?" + "IdCategory=" + idCategory + "&Keyword=" + keyword + 
    "&Sort=" + sort + "&MinInPrice=" + minPrice + "&MaxInPrice=" + maxPrice + "&PageSize=" + pageSize + "&Page=" + page;
    return this.authHttpService.get(path).map(res => res.json() || []);
  }
}
