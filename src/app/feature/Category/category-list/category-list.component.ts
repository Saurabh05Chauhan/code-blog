import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { category } from '../Models/category';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink,CommonModule ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit,OnDestroy {




  categories$:Observable<category[]>|undefined;
  deleteSub?:Subscription;
  totalCount?:number;
  pageNumber:number=1;
  pageSize:number=2;
  list:number[]=[];
  constructor(private service:CategoryService){

  }
  
  
  ngOnInit(): void {
    this.service.getCategoryCount().subscribe({
      next:(res)=>{
        this.totalCount=res;
        this.list=new Array(Math.ceil(this.totalCount/this.pageSize))
        this.categories$=this.service.getCategoryList(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );

      }
    })
  }

  delete(id: string) {
    this.deleteSub=this.service.deleteCategory(id).subscribe({
      next:(res)=>{
        // if(res){
        //   alert("Deleted");

        // }

        this.ngOnInit();
      }
    })
    }

    onSearch(query: string) {
      this.categories$=this.service.getCategoryList(query,undefined,undefined);

    }

    sort(sortBy: string,sortDirection: string) {
      this.categories$=this.service.getCategoryList(undefined,sortBy,sortDirection,this.pageNumber,this.pageSize);
    }

    getPage(pageNumber: number) {
      this.pageNumber=pageNumber;
      this.categories$=this.service.getCategoryList(undefined,undefined,undefined,pageNumber,this.pageSize);

    }

    getPrevPage() {
      if(this.pageNumber-1<1){
        return;
      }
      this.pageNumber-=1;
      this.categories$=this.service.getCategoryList(undefined,undefined,undefined,this.pageNumber,this.pageSize);

      }


      getNextPage() {

        if(this.pageNumber+1>this.list.length){
          return;
        }
        this.pageNumber+=1;
        this.categories$=this.service.getCategoryList(undefined,undefined,undefined,this.pageNumber,this.pageSize);
  
      }

    ngOnDestroy(): void {
      this.deleteSub?.unsubscribe();
    }

}
