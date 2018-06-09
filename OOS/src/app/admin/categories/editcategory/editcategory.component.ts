import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryModel, CategoryStatus } from '../../models/category';
import { StringDecoder } from 'string_decoder';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { BreadcrumbService } from 'long-ng5-breadcrumb';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private breadcrumbService:BreadcrumbService
  ) {}

  public cate = new CategoryModel;
  public status = CategoryStatus;
  public keys: Array<string>;
  public item: number;
  public id: string;

  ngOnInit() {

    let params: any = this.activatedRoute.snapshot.params;
    this.id = params.id;
    this.getById(this.id);
    this.getStatus();
    //this.breadcrumbService.addFriendlyNameForRouteRegex('/admin/manager/categories/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}', this.displayNameForCategory());
  }

  displayNameForCategory():string{
    var cate = this.categoryService.setCate();
    return cate.Name;
  }

  getStatus() {
    this.keys = Object.keys(this.status).filter(Number);
    //this.item = CategoryStatus.Unpublish;
  }

  getById(id) {
    this.spinnerService.startLoadingSpinner();
    this.categoryService.getById(id).subscribe(category => {
      this.categoryService.getCate(category);
      this.breadcrumbService.addFriendlyNameForRouteRegex('/admin/manager/categories/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}', this.displayNameForCategory());
      this.spinnerService.turnOffSpinner();

      this.cate = category;
    });
  }

  editCategory() {
    this.spinnerService.startLoadingSpinner();

    this.cate.Name = this.cate.Name;
    this.cate.Description = this.cate.Description;
    this.cate.Status = this.cate.Status;

    this.categoryService.put(this.cate.Id, this.cate).subscribe(data => {
      this.spinnerService.turnOffSpinner();

      //this.router.navigate(['/admin/categories']);
      this.router.navigate(['/admin/manager/categories']);
    });
  }
}
