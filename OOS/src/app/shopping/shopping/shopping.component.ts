import { Component, OnInit, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ProductModel } from '../models/product';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, ChildActivationEnd } from '@angular/router';
import normalize, { normalizeSync } from 'normalize-diacritics';
import { CategoryModel } from '../models/category';
import { EmailService } from '../services/email.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { EmailSubscribeModel } from '../models/emailSubscribe';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { CreateUserModel } from '../models/user/create-user/create-user';
import { AccountService } from '../services/account.service';
import { SocialNetworkModel } from '../../admin/models/SocialNetworkModel';
import { SocialNetworkService } from '../../admin/services/socialnetwork.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, PipeTransform {
  transform(value: string) {
    let newvalue = value
      .replace(/Đ/g, 'D')
      .replace(/đ/g, 'd')
      .replace(/&/g, '')
      .replace(/\s/g, '_');
    return newvalue;
  }
  //Search product for order details
  private searchTerms = new Subject<string>();
  categories: any[] = [];
  listProduct: Observable<ProductModel[]>;
  searchResult: string = '';
  choosedProduct: ProductModel;
  hidden: boolean = false;
  idCategory: string = "all";
  keyword: string;
  expanded: boolean;
  test: string;
  path: string;
  dblock: string;
  socialnetworks = new SocialNetworkModel();

  public emailSubscribe: string;

  public user = new CreateUserModel;

  componentRef: any;

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private ele: ElementRef,
    private emailService: EmailService,
    private spinnerService: SpinnerService,
    private toasterService: ToasterService,
    private socialNetworkService: SocialNetworkService
  ) {
    router.events.subscribe(event => {
      if (event instanceof ChildActivationEnd) {
        if (this.router.url == "/") this.dblock = "block";
        else this.dblock = "";
      }
    });
  }

  ngOnInit() {
    this.categoryService.get().subscribe(data => {
      this.categories = data;
    });

    this.listProduct = this.searchTerms.pipe(

      // wait 50ms after each keystroke before considering the term
      debounceTime(50),

      // ignore new term if same as previous term
      //distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProduct(this.idCategory, term))
    );
    this.getfoter();
    this.accountService.getUserSession().subscribe(data => {
      this.user = data
    });
  }

  search(term: string): void {
    if (term === "") this.hidden = true;
    else this.hidden = false;
    this.searchTerms.next(term);
  }

  hide() {
    this.hidden = true;
  }

  routeCategory(idCategory: string, categoryName: any) {
    var path = "/category/" + idCategory + "_" + this.transform(normalizeSync(categoryName));
    this.router.navigateByUrl(path);
  }

  routeProduct(product: any) {
    var path = "/product/" + product.id + "_" + this.transform(normalizeSync(product.Name));
    this.router.navigateByUrl(path);
  }

  categoryName(catid: string): string {
    var name;
    for (var i = 0; i < this.categories.length; i++) {
      if (catid == this.categories[i].Id) name = this.categories[i].Name;
    }
    return name;
  }

  searchProduct() {
    if (this.keyword === undefined || this.keyword === "") { }
    else {
      this.router.navigate(['/search'], { queryParams: { cat: this.idCategory, op: this.keyword } });
    }
  }
  sentEmailSubscribe() {
    let email = new EmailSubscribeModel();
    email.EmailSubscribe = this.emailSubscribe;
    this.spinnerService.startLoadingSpinner();
    this.emailService.emailSubscribe(email).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      setTimeout(() => {
        this.toasterService.pop('success', 'successfuly', 'Added!');
      }, 500)
    })
  }

  logout() {
    sessionStorage.removeItem('user')
    this.accountService.setUserSession()
    this.router.navigateByUrl("")
  }

  getfoter() {
    this.socialNetworkService.getfoter().subscribe(data => {
      this.socialnetworks = data;
      console.log(this.socialnetworks);
    });
  }
}
