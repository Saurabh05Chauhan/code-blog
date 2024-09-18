import { Component, OnInit } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../Services/blog-post.service';
import { BlogPost } from '../Models/Blog-Post';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})
export class BlogPostListComponent implements OnInit{

  constructor(private service:BlogPostService){

  }

  model?:Observable<BlogPost[]>;

  ngOnInit(): void {
    this.model=this.service.GetBlogPost();
  }
}
