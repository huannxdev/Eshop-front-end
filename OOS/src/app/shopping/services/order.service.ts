import { Injectable } from '@angular/core';
import { OrdersModel } from '../models/order';
import { Observable } from 'rxjs/Observable';
import { AuthHttpService } from '../../auth/auth-http.service';
import { PagingModel } from '../models/paging';


@Injectable()
export class OrderService {
  
  public order=new OrdersModel;  

  constructor(private authHttpService: AuthHttpService) { }


  private API_PATH = 'http://fbinterns.azurewebsites.net/api/order/';  

  add(order: OrdersModel): Observable<any> {
    return this.authHttpService.post(this.API_PATH, order);      
  }  

  getOderDetails(id): Observable<OrdersModel> {
    return this.authHttpService.get(this.API_PATH + "/" + id)
      .map(res => res.json() || [])
  }

  put(id :string,order: OrdersModel): Observable<any> {
    return this.authHttpService.put(this.API_PATH + id, order)
      .map(res => {
        console.log("order service res =" + res)
        console.log("order service res.json =" + res.json())
        return res.json() || []})
  }

  setOrder(order): void {
    this.order = order;
  }

  getOrder() {
    return this.order;
  }

  getList(email: string, phone: string, pageSize: number, page: number): Observable<PagingModel> {
    return this.authHttpService.get(this.API_PATH+"?Email="+email+"&Phone="+phone+"&PageSize="+pageSize+"&Page="+page)
      .map(res => res.json() || [])
  }

  delete(id: string)
  {
    return this.authHttpService.delete(this.API_PATH+id);
  }

}
