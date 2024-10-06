import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../Services/category.service';
import { category } from '../Models/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy{

  id:string|null=null;
  params:Subscription | undefined;
  Cparams:Subscription | undefined;
  categoryModel:category;
  constructor(private router:ActivatedRoute,private service:CategoryService,private route:Router){
    this.categoryModel={
      Id:"",
      UrlHandle:"",
      Name:""
    }
  }
  
  ngOnInit(): void {
   this.params= this.router.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');

        if(this.id){
          this.Cparams=this.service.getCategoryById(this.id).subscribe({
            next:(res)=>{
              this.categoryModel=res;
            }
          })
        }
      }
    })

    
    //throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.service.updateCategory(this.categoryModel).subscribe({
      next:(res)=>{
        if(res!=null){
          this.categoryModel=res;
          this.route.navigateByUrl('/admin/categories');
        }
      }
    })
    }

  ngOnDestroy(): void {
    this.params?.unsubscribe();
    this.Cparams?.unsubscribe();
  }
  

}
