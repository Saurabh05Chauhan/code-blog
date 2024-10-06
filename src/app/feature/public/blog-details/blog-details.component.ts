import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/Services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/Models/Blog-Post';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { NgxLoadingModule } from "ngx-loading";
@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule,MarkdownModule,NgxLoadingModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{

  url:string| null =null;
  blog$?:BlogPost;
loading: boolean=true;
  constructor( private route:ActivatedRoute, private blogService:BlogPostService){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        this.url=params.get('url');
      }
    })

    if(this.url){
      this.getBlogbyUrl(this.url);
      }
  }

  //Fetch blog details by url
  getBlogbyUrl(url:string){
    this.loading=true;
    this.blogService.GetBlogPostByURL(url).subscribe((res)=>{
      this.blog$=res;
      this.loading=false;
    });
  }

}
