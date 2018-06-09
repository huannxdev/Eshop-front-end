import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories : CategoryModel[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.categoryService.get().subscribe(categories => {this.categories = categories});
  }

}
