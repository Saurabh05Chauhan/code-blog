import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/Services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/Models/Blog-Post';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgxLoadingModule } from "ngx-loading";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxLoadingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
   blogs$?:BlogPost[];
  loading: boolean=true;
  constructor(private blogService:BlogPostService, ) {
    
    
  }

  ngOnInit(): void {
    debugger
    this.loading=true;
    this.blogService.GetBlogPost().subscribe((res)=>{
      this.blogs$=res;
      this.loading=false;
    });
    
  }

}
