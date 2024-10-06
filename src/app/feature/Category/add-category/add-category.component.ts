import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../Models/add-category-request-model';
import { CategoryService } from '../Services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{

model: AddCategoryRequest;
addCategory?:Subscription;
  constructor(private service:CategoryService,private router:Router) {
    this.model={
      UrlHandle:"",
      Name:""
    }
    
  }
  
onSubmit() {
  this.addCategory=this.service.addCategory(this.model).subscribe({
    next:(response)=>{
      this.router.navigateByUrl('/admin/categories');
    }
  });
}

ngOnDestroy(): void {
  this.addCategory?.unsubscribe();
}

}
