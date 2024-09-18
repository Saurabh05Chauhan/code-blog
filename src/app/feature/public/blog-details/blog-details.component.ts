import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/Services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/Models/Blog-Post';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule,MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{

  url:string| null =null;
  blog$?:Observable<BlogPost>;
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
    this.blog$=this.blogService.GetBlogPostByURL(url);
  }

}
