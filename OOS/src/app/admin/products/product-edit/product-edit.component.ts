import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/Product.service';
import { ProductModel } from '../../models/product';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { ProductStatus } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { BreadcrumbService } from 'long-ng5-breadcrumb';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productIsExist: boolean=true;
  id: string;
  product = new ProductModel();
  public statusDefine = ProductStatus;
  public item: number;
  public keys: any;
  categorys: any;
  data: any;

  constructor(private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private categoryService: CategoryService,
    private breadcrumbService:BreadcrumbService ) { }
  getById(id) {
    this.productService.get(this.id).subscribe(data => {
      
      if(data.Id==null)//id is invalid
      {
        this.productIsExist=false;
      }
      else
      {
        this.productService.getPro(data);
        this.breadcrumbService.addFriendlyNameForRouteRegex('/admin/manager/products/edit/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}', this.displayNameForProduct());
        this.product = data;
        this.data = this.product.ProductTails;
      }
      this.spinnerService.turnOffSpinner();
    });
  }
  ngOnInit() {
    this.spinnerService.startLoadingSpinner();
    // get id
    let params: any = this.activatedRoute.snapshot.params;
    this.id = params.id;
    this.getById(this.id);
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/admin/manager/products/edit/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}', this.displayNameForProduct());

    this.categoryService.get().subscribe(
      data => {
        this.categorys = data;
        this.spinnerService.turnOffSpinner();
      }
    );
    this.getStatus();

  }

  displayNameForProduct(){
    var cate = this.productService.setPro();
    return cate.Name;
  }
  
  getStatus() {
    this.keys = Object.keys(this.statusDefine).filter(Number);
  }

  update() {
    this.spinnerService.startLoadingSpinner();
    this.productService.putProduct(this.product).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.router.navigateByUrl('/admin/manager/products');
    });
  }

  settings = {
    columns: {
      image: {
        title: 'Image',
        filter: false,
        editor: {
          type: 'textarea',
        },
      },
      color: {
        title: 'Color',
        filter: false,
        validation: 'color',
      },
      size: {
        title: 'Size',
        filter: false,
      },
      price: {
        title: 'Price',
        filter: false,
        validation: 'number',
      },
      quantity: {
        title: 'Quantity',
        filter: false,
        validation: 'number',
      },
    },
  };


}