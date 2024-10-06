import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { AddBlogPost } from '../Models/Add-BlogPost';
import { category } from '../../Category/Models/category';
import { BlogPost } from '../Models/Blog-Post';
import { CategoryService } from '../../Category/Services/category.service';
import { EditBlogPost } from '../Models/Edit-BlogPosts';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
    selector: 'app-edit-blog-post',
    standalone: true,
    templateUrl: './edit-blog-post.component.html',
    styleUrl: './edit-blog-post.component.css',
    imports: [FormsModule, DatePipe, MarkdownModule, CommonModule, ImageSelectorComponent,NgxLoadingModule]
})
export class EditBlogPostComponent implements OnInit,OnDestroy{


  id:string|null=null;
  params:Subscription | undefined;
  blogparams:Subscription | undefined;
  updateBlogparams:Subscription | undefined;
  deleteBlogparams:Subscription | undefined;
  imageSelected:Subscription | undefined;
  model:BlogPost;
  requestModel?:EditBlogPost;
  categories$?:Observable<category[]>;
  selectedCategory?:string[];
  isImageSelectorVisible:boolean=false;
loading: boolean=true;
  constructor(private router:ActivatedRoute,private service:BlogPostService,private categoryService:CategoryService,private route:Router,private imgService:ImageService){
    this.model={
      Id:"",
      Title:"",
    ShortDescription:"",
    Content:"",
    FeaturedImageURL:"",
    UrlHandle:"",
    Author:"",
    PublishedDate:new Date(),
    IsVisible:true,
    Categories:[]

    }
  }
  

  ngOnInit(): void {
    this.loading=true;
    this.categories$=this.categoryService.getCategoryList();
    this.params=this.router.paramMap.subscribe({
      next:(params)=>{
        this.id =params.get('id');
        if(this.id){
          this.blogparams=this.service.GetBlogPostByID(this.id).subscribe({
            next:(res)=>{
              console.log(res);
              this.model=res;
              this.selectedCategory=res.Categories.map(x=>x.Id);
              this.loading=false;
            }
          })
        }

        this.imageSelected=this.imgService.onSelectImage().subscribe({
          next:(res)=>{
            if(this.model){
              this.model.FeaturedImageURL=res;
              this.openImageSelector();
            }
          }
        })

      }
    });
  }

  onSubmit() {
    debugger
    this.selectedCategory;
    this.requestModel={
      Id:this.model.Id,
      Title:this.model.Title,
    ShortDescription:this.model.ShortDescription,
    Content:this.model.Content,
    FeaturedImageURL:this.model.FeaturedImageURL,
    UrlHandle:this.model.UrlHandle,
    Author:this.model.Author,
    PublishedDate:this.model.PublishedDate,
    IsVisible:this.model.IsVisible,
    Categories:this.selectedCategory ?? [ ]

    }
    this.loading=true;
    this.updateBlogparams=this.service.UpdateBlogPost(this.requestModel).subscribe((res)=>{
      
        debugger
        this.model=res;
        // console.log(res);
        // this.selectedCategory=res.Categories.map(x=>x.Id);
        this.loading=false;
        this.route.navigateByUrl('/admin/blogposts');
      
    })
  }

  deleteBlog(id: string) {
    this.deleteBlogparams=this.service.DeleteBlog(id).subscribe((res)=>{
        this.route.navigateByUrl('/admin/blogposts');
      })
    }

    openImageSelector() {
      this.isImageSelectorVisible=!this.isImageSelectorVisible;
      }

  ngOnDestroy(): void {
    this.blogparams?.unsubscribe();
    this.params?.unsubscribe();
    this.updateBlogparams?.unsubscribe();
    this.deleteBlogparams?.unsubscribe();
    this.imageSelected?.unsubscribe();
  }
}
