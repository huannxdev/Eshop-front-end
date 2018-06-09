import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from '../../models/category';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  category = new CategoryModel;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
     this.getCategory();
  }

  getCategory(): void{
    var id = this.route.snapshot.paramMap.get("id");
    this.categoryService.getById(id).subscribe(category => this.category = category);
  }

  deleteCategory(category: CategoryModel){
    this.categoryService.delete(category).subscribe( a => {
        this.router.navigateByUrl("admin/categories");
    });
  }

  backClicked() {
    this.location.back();
  }
}
