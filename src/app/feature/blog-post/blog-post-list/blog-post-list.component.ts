import { Component, OnInit } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../Services/blog-post.service';
import { BlogPost } from '../Models/Blog-Post';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-blog-post-list',
  standalone: true,
  imports: [RouterLink,CommonModule,NgxLoadingModule],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})
export class BlogPostListComponent implements OnInit{
loading: boolean=true;

  constructor(private service:BlogPostService){

  }

  model?:BlogPost[];

  ngOnInit(): void {
    this.loading=true;
    this.service.GetBlogPost().subscribe((res)=>{
      this.model=res;
      this.loading=false;
    });
  }
}
