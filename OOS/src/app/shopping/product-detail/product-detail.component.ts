import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { ProductTail } from '../../admin/models/ProductTail';
import { takeLast } from 'rxjs/operators';
import { BannerModel } from '../models/banner';
import { CartService } from '../services/cart.service';
import { ProductCartModel } from '../models/productCart';
import { ToasterService } from 'angular2-toaster';
import { ProductModel } from '../models/product';
import { ConfigurationService } from '../services/configuration.service';
import { Currency } from '../models/configuration';
import { MetaDataService } from '../services/meta-data.service';
import { AccountService } from '../services/account.service';
import { CreateUserModel } from '../models/user/create-user/create-user';
import { UserModel } from '../models/user/user';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // private toasterService: ToasterService;
  idProduct: string;
  product = new ProductModel();
  colorSelected: string;
  sizeSelected: string;
  listSize = [];
  listColor = [];
  price: number;
  image: string;
  listImages = [];
  available: string;
  flagCartButton: boolean = true;
  quantity: number = 1;
  quantityAvailble: number = 0;
  productCart: ProductCartModel;
  currency: number;
  public currencyDefine = Currency;
  public link: any;
  productIsExist: boolean = true;
  oldPrice: number;
  DiscountExisted: boolean = true;
  SizeExisted: boolean = true;
  user: UserModel


  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private toasterService: ToasterService,
    private metadataService: MetaDataService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    let params: any = this.activatedRoute.snapshot.params;
    this.link = this.activatedRoute.snapshot.params.id;
    this.idProduct = this.GetIdProduct(params.id);
    this.productService.get(this.idProduct).subscribe(data => {
      if (data.Id == null) {
        this.productIsExist = false;
        return;
      }
      let tempProduct = data
      this.user = this.accountService.currentUser.getValue()
      if (this.user != null) {
        this.accountService.checkWishProduct(this.user.UserName, tempProduct.Id).subscribe(data => {
          if (data.isWishProduct)
            tempProduct.IsLove = true
        }
        )
      }
      this.product = tempProduct;
      this.colorSelected = this.product.ProductTails[0].Color;
      this.sizeSelected = this.product.ProductTails[0].Size;
      this.getSizeByColor(this.colorSelected);
      this.setPriceImageQuantity(this.colorSelected, this.sizeSelected);

      this.listColor = this.getColorOption();
      if (this.product.Discount === 0)
        this.DiscountExisted = false;
      this.metadataService.setCurrency();
      this.currency = this.metadataService.getCurrency();

    });
    this.addFacebookComment();
  }



  addFacebookComment() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12";

      if (d.getElementById(id)) {
        //if <script id="facebook-jssdk"> exists
        delete (<any>window).FB;
        fjs.parentNode.replaceChild(js, fjs);
      } else {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));
  }

  GetIdProduct(id: string) {
    return id.slice(0, id.indexOf("_"));
  }
  onChange() {
    this.listSize = [];
    this.listImages = [];
    this.getSizeByColor(this.colorSelected);
    this.setPriceImageQuantity(this.colorSelected, this.sizeSelected);
  }
  onChangeColor() {
    this.setPriceImageQuantity(this.colorSelected, this.sizeSelected);
  }

  getSizeByColor(color: string) {
    var tail: ProductTail[];
    tail = this.product.ProductTails;
    for (var i = 0; i < tail.length; i++) {
      if (tail[i].Color === color) {
        if (tail[i].Size != "")
          this.listSize.push(tail[i].Size);
        this.listImages.push({
          Image: tail[i].Image,
          Title: "",
          Content: ""
        });
      }
    }
    if (this.listSize.length == 0)
      this.SizeExisted = false;
  }
  setPriceImageQuantity(color: string, size: string) {
    var price = 0;
    var tail: ProductTail[];
    tail = this.product.ProductTails;
    for (var i = 0; i < tail.length; i++) {
      if (tail[i].Color === color && tail[i].Size === size) {
        this.oldPrice = tail[i].Price;
        this.price = parseFloat((this.oldPrice - this.oldPrice * this.product.Discount * 0.01).toFixed(1));
        this.image = tail[i].Image;
        this.quantityAvailble = tail[i].Quantity;
        if (this.quantityAvailble > 0) {
          this.available = "In Stock";
          this.flagCartButton = false;
        }
        else {
          this.available = "Out of Stock";
          this.flagCartButton = true;
        }

      }
    }
    return 0;
  }
  getColorOption() {
    var listColor = [];
    var tail: ProductTail[];
    tail = this.product.ProductTails;
    for (var i = 0; i < tail.length; i++) {
      listColor.push(tail[i].Color);
    }
    let unique_array = listColor.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });
    return unique_array
  }

  AddToCart() {
    var product = {
      Id: this.product.Id,
      Description: this.product.Description,
      Image: this.image,
      Name: this.product.Name,
      Price: this.price,
      Color: this.colorSelected,
      Size: this.sizeSelected,
      Quantity: this.quantityAvailble,
      Code: this.product.Code
    }
    this.cartService.set(product, this.quantity);
    //pop up toaster
    this.toasterService.pop('success', product.Name, 'Added to cart success!');
  }
  setColor(color) {
    this.colorSelected = color;
  }

  wish() {
    if (this.user != null) {
      let idUser = this.user.UserName
      this.accountService.addWishProduct(idUser, this.product.Id).subscribe(data => {
        this.toasterService.pop("success", "success", "You have successfully added item to wishlist")
        this.product.IsLove = true;
      })
    }
    else {
      this.toasterService.pop("error", "error", "You have to login first to use this feature")
    }
  }

  removeWish() {
    let idUser = this.user.Id
    this.accountService.removeFromWishList(idUser, this.product.Id).subscribe(data => {
      this.toasterService.pop("success", "success", "You have successfully removed item from wishlist")
      this.product.IsLove = false;
    })
  }
}

