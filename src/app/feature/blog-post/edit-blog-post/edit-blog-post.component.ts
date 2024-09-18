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

@Component({
    selector: 'app-edit-blog-post',
    standalone: true,
    templateUrl: './edit-blog-post.component.html',
    styleUrl: './edit-blog-post.component.css',
    imports: [FormsModule, DatePipe, MarkdownModule, CommonModule, ImageSelectorComponent]
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
  constructor(private router:ActivatedRoute,private service:BlogPostService,private categoryService:CategoryService,private route:Router,private imgService:ImageService){
    this.model={
      id:"",
      title:"",
    shortDescription:"",
    content:"",
    featuredImageURL:"",
    urlHandle:"",
    author:"",
    publishedDate:new Date(),
    isVisible:true,
    categories:[]

    }
  }
  

  ngOnInit(): void {
    this.categories$=this.categoryService.getCategoryList();
    this.params=this.router.paramMap.subscribe({
      next:(params)=>{
        this.id =params.get('id');
        if(this.id){
          this.blogparams=this.service.GetBlogPostByID(this.id).subscribe({
            next:(res)=>{
              console.log(res);
              this.model=res;
              this.selectedCategory=res.categories.map(x=>x.id);
            }
          })
        }

        this.imageSelected=this.imgService.onSelectImage().subscribe({
          next:(res)=>{
            if(this.model){
              this.model.featuredImageURL=res;
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
      id:this.model.id,
      title:this.model.title,
    shortDescription:this.model.shortDescription,
    content:this.model.content,
    featuredImageURL:this.model.featuredImageURL,
    urlHandle:this.model.urlHandle,
    author:this.model.author,
    publishedDate:this.model.publishedDate,
    isVisible:this.model.isVisible,
    Categories:this.selectedCategory ?? [ ]

    }

    this.updateBlogparams=this.service.UpdateBlogPost(this.requestModel).subscribe({
      next:(res)=>{
        this.model=res;
        this.selectedCategory=res.categories.map(x=>x.id);
        this.route.navigateByUrl('/admin/blogposts');
      }
    })
  }

  deleteBlog(id: string) {
    this.deleteBlogparams=this.service.DeleteBlog(id).subscribe({
      next:(res)=>{
        this.route.navigateByUrl('/admin/blogposts');
      }
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
