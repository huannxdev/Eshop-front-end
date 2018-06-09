import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../models/product';
import { CartService } from '../services/cart.service';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from '../../shared/services/spinner.service';
import { normalizeSync } from 'normalize-diacritics';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Currency } from '../models/configuration';
import { MetaDataService } from '../services/meta-data.service';


@Component({
  selector: 'app-widget-box',
  templateUrl: './widget-box.component.html',
  styleUrls: ['./widget-box.component.css',
    '../../../../node_modules/angular2-toaster/toaster.css',
    '../../../../node_modules/angular2-toaster/toaster.min.css'
  ]
})
export class WidgetBoxComponent implements OnInit {
  private toasterService: ToasterService;
  id: string = ''
  idUser: string

  @Input() productDetail: ProductModel;
  public currencyDefine = Currency;
  currency : number;
  constructor(
    toasterService: ToasterService,
    private cartService: CartService,
    private accountService: AccountService,
    private router: Router,
    private spinnerService: SpinnerService,
    private metadataService: MetaDataService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.metadataService.setCurrency();    
    this.currency = this.metadataService.getCurrency(); 
  }
  menuToggle(event: any) {
    // this.renderer.setElementClass(event.target,"opened",true);
    console.log("click");

  }
  transform(value: string) {
    let newvalue = value
      .replace(/Đ/g, 'D')
      .replace(/đ/g, 'd')
      .replace(/&/g, '')
      .replace(/\s/g, '_');
    return newvalue;
  }
  routeProduct() {
    var nameProduct = normalizeSync(this.productDetail.Name);
    var path = "/product/" + this.productDetail.Id + "_" + this.transform(nameProduct);
    this.router.navigateByUrl(path);
  }

  addProductCart(product) {
    this.spinnerService.startLoadingSpinner();
    var productCart = {
      Name: this.productDetail.Name,
      Id: this.productDetail.Id,
      Price: this.productDetail.ProductTails[0].Price,
      Description: this.productDetail.Description,
      Image: this.productDetail.ProductTails[0].Image,
      Size: this.productDetail.ProductTails[0].Size,
      Color: this.productDetail.ProductTails[0].Color,
      Quantity: this.productDetail.ProductTails[0].Quantity
    }
    this.cartService.set(productCart, 1);
    this.spinnerService.turnOffSpinner();
    //pop up toaster
    this.toasterService.pop('success', product.Name, 'Added to cart success!');
  }

  wish() {
    let user = this.accountService.currentUser.getValue()
    if (user != null) {
      let idUser = user.Id
      this.accountService.addWishProduct(idUser, this.productDetail.Id).subscribe(data => {
        this.toasterService.pop("success", "success", "You have successfully added item to wishlist")
        this.productDetail.IsLove = true;
      })
    }
    else {
      this.toasterService.pop("error", "error", "You have to login first to use this feature")
    }
  }

  removeWish() {
    let user = this.accountService.currentUser.getValue()
    let idUser = user.Id
    this.accountService.removeFromWishList(idUser, this.productDetail.Id).subscribe(data => {
      this.toasterService.pop("success", "success", "You have successfully removed item from wishlist")
      this.productDetail.IsLove = false;
    })

  }
}
