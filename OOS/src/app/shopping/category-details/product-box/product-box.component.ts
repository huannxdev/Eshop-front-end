import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { normalizeSync } from 'normalize-diacritics';
import { Router } from '@angular/router';
import { ProductCartModel } from '../../models/productCart';
import { Currency } from '../../models/configuration';
import { MetaDataService } from '../../services/meta-data.service';
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css',
    '../../../../../node_modules/angular2-toaster/toaster.css',
    '../../../../../node_modules/angular2-toaster/toaster.min.css']
})
export class ProductBoxComponent implements OnInit {

  private toasterService: ToasterService;

  id: string = '';
  @Input() productDetail: ProductModel;
  currency : number;
  public currencyDefine = Currency;

  constructor(
    toasterService: ToasterService,
    private cartService: CartService,
    private router: Router,
    private spinnerService: SpinnerService,private metadataService: MetaDataService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.metadataService.setCurrency();    
    this.currency = this.metadataService.getCurrency(); 
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
      Color: this.productDetail.ProductTails[0].Color,
      Size: this.productDetail.ProductTails[0].Size,
      Quantity: this.productDetail.ProductTails[0].Quantity,
    }
    this.cartService.set(productCart, 1);
    this.spinnerService.turnOffSpinner();
    //pop up toaster
    this.toasterService.pop('success', product.name, 'Added to cart success!');
  }
}
