import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AccountService } from '../../services/account.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { UserModel } from '../../models/user/user';
import { normalizeSync } from 'normalize-diacritics';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-wishlist-account',
  templateUrl: './wishlist-account.component.html',
  styleUrls: ['./wishlist-account.component.css']
})
export class WishlistAccountComponent implements OnInit {

  @Input() userId:string;
  wishListProduct:any;
  user:UserModel;
  productID:string;
  username: string;

  constructor(
    private productService:ProductService,
    private accountService:AccountService,
    private spinnerService:SpinnerService,
    private cartService: CartService,
    private toasterService:ToasterService,
    private router: Router,
    private ss: AccountService
  ) { }

  ngOnInit() {
    this.ss.getUserSession().subscribe(data => this.username = data.UserName);
    this.ss.setUserSession();
    this.spinnerService.startLoadingSpinner();
    this.getWishListProduct(this.username);
    this.spinnerService.turnOffSpinner();
  }

  getWishListProduct(userId)
  {
    this.accountService.getWishList(userId).subscribe(data =>{
      this.wishListProduct = data;
      console.log(data);
    });
  }

  setId(productId:string) //set product id to remove from wishlist
  {
    this.productID = productId;
  }

  deleteProduct()
  {
    this.spinnerService.startLoadingSpinner();
    this.accountService.removeFromWishList(this.username, this.productID).subscribe(() => {
      this.getWishListProduct(this.username);
      this.spinnerService.turnOffSpinner();
    });
  }

  addToCart(product:ProductModel)
  {
    var productToAdd = {
      Name: product.Name,
      Id: product.Id,
      Price: product.ProductTails[0].Price,
      Description: product.Description,
      Image: product.ProductTails[0].Image,
      Size: product.ProductTails[0].Size,
      Color: product.ProductTails[0].Color,
      Quantity:product.ProductTails[0].Quantity
    }
    this.cartService.set(productToAdd, 1);
      //pop up toaster
    this.toasterService.pop('success', product.Name, 'Added to cart success!');
  }

  transform(value: string) {
    let newvalue = value
      .replace(/Đ/g, 'D')
      .replace(/đ/g, 'd')
      .replace(/&/g, '')
      .replace(/\s/g, '_');
    return newvalue;
  }

  routeProduct(product:ProductModel) {
    var nameProduct = normalizeSync(product.Name);
    var path = "/product/" + product.Id + "_" + this.transform(nameProduct);
    this.router.navigateByUrl(path);
  }
}
