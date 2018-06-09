import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';

import { EventEmitter, Output } from '@angular/core';

import { CategoryModel } from '../models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  listCategory: CategoryModel[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getListCategory();
  }

  getListCategory() {
    this.categoryService.get().subscribe(result => {
      this.listCategory = result
    })
  }  
}
