import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryModel, CategoryStatus } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { AnonymousSubject } from 'rxjs';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router,
    private spinnerService: SpinnerService
  ) { 
  }

  listCategory: CategoryModel[];
  newCategory = new CategoryModel;
  name: string = '';
  description: string = '';
  public keys: Array<string>;
  status = CategoryStatus;
  status1: number = 1; // gan status mac dinh

  ngOnInit() {    
    this.keys = Object.keys(this.status).filter(Number);
  }

  getListCategory() {
    this.categoryService.get().subscribe(result => {
      this.listCategory = result
    })
  }

  addCategory() {
    this.spinnerService.startLoadingSpinner();
    
    let newCategory = new CategoryModel();
    newCategory.Name = this.name;
    newCategory.Description = this.description;
    newCategory.Status = this.status1;

    this.categoryService.add(newCategory)
      .subscribe(
        data => {
          this.spinnerService.turnOffSpinner();

          this.router.navigate(['/admin/manager/categories']);
        }
      )

  }

}
