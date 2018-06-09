import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/Product.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { ProductStatus } from '../../models/product';
import { Http } from '@angular/http';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  id: string;
  product: any;
  productEdit:any;
  name: string;
  description: string;
  details:string;
  categorys: any;
  code: string;
  idCategory: string = '';
  status: number;
  discount : number;
  content: string ='';
  public status1 = ProductStatus;
  public item: number;
  public keys: any;


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
        validation:'number',
      },
      quantity: {
        title: 'Quantity',
        filter: false,
        validation: 'number',
      },
    },
  };
  data = [
  ];

  constructor(private productService: ProductService, private router: Router,
    private categoryService: CategoryService,
    private spinnerService: SpinnerService,
    http: Http) {
  }

  ngOnInit() {
    this.id = this.productService.idProduct;
    this.productService.get(this.id).subscribe(data => {
      this.product = data;
    });
    this.categoryService.get().subscribe(
      data => {
        this.categorys = data;
      }
    );

    this.getStatus();

  }

  getStatus() {
    this.keys = Object.keys(this.status1).filter(Number);
  }
  
  create() {
    var product = {
      Name: this.name,
      Description: this.description,
      Details:this.content,
      IdCategory: this.idCategory,
      Code: this.code,
      Status: this.status,
      Discount : this.discount,
      ProductTails:this.data
    }
    this.productService.postProduct(product).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.router.navigateByUrl('/admin/manager/products');
    });
  }





}
