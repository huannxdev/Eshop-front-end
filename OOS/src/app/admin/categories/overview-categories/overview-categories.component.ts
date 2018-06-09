import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'
import { CategoryModel, CategoryStatus } from '../../models/category'
import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/services/spinner.service';


@Component({
  selector: 'app-overview-categories',
  templateUrl: './overview-categories.component.html',
  styleUrls: ['./overview-categories.component.css']
})
export class OverviewCategoriesComponent implements OnInit {

  listCategories: CategoryModel[];

  cateDel = new CategoryModel; // bien category can delete
  public status = CategoryStatus;  

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
   }

  ngOnInit() {
    this.getListCategories();
    
  }
  getListCategories() {
    this.spinnerService.startLoadingSpinner();

    this.categoryService.get().subscribe(data => {
      this.spinnerService.turnOffSpinner();

      this.listCategories = data;

      // reverse sort
      this.listCategories.sort((a,b)=>{
        return 1; //reverse the array
      })
    })
  }

  get(id) {
    this.categoryService.getById(id).subscribe(data => {
      this.cateDel = data;
    })
  }

  getCate(category:CategoryModel)
  {
    this.categoryService.getCate(category);
  }
  
  delete() {  
    this.spinnerService.startLoadingSpinner();
    
    this.categoryService.delete(this.cateDel).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.getListCategories();
    });
  }
}
