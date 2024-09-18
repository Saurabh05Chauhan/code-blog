import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../Models/Add-BlogPost';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../Services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Category/Services/category.service';
import { category } from '../../Category/Models/category';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
    selector: 'app-add-blog-post',
    standalone: true,
    templateUrl: './add-blog-post.component.html',
    styleUrl: './add-blog-post.component.css',
    imports: [FormsModule, DatePipe, MarkdownModule, CommonModule, ImageSelectorComponent]
})
export class AddBlogPostComponent implements OnInit, OnDestroy {
  model:AddBlogPost;
  blogPost?:Subscription;
  categories$?:Observable<category[]>;
  isImageSelectorVisible:boolean=false;
  imageSelected:Subscription | undefined;
  constructor(private service:BlogPostService,private router:Router,private category:CategoryService,private imgService:ImageService){
    this.model={
      title:"",
    shortDescription:"",
    content:"",
    featuredImageUrl:"",
    urlHandle:"",
    author:"",
    publishedDate:new Date(),
    isVisible:true,
    categories:[]

    }
  }
  ngOnInit(): void {
    this.categories$=this.category.getCategoryList();
    this.imageSelected=this.imgService.onSelectImage().subscribe({
      next:(res)=>{
        if(this.model){
          this.model.featuredImageUrl=res;
          this.openImageSelector();
        }
      }
    })
  }
  
  openImageSelector() {
    this.isImageSelectorVisible=!this.isImageSelectorVisible;
    }

  onSubmit() {
    this.blogPost=this.service.CreateBlogPost(this.model).subscribe({
      next:(res)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
    }

    ngOnDestroy(): void {
      this.blogPost?.unsubscribe();
      this.imageSelected?.unsubscribe();
    }
}
