import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../Models/Add-BlogPost';
import { BlogPost } from '../Models/Blog-Post';
import { environment } from '../../../../environments/environment';
import { EditBlogPost } from '../Models/Edit-BlogPosts';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private API_URL= environment.apiBaseUrl;
  constructor(private client:HttpClient) { }

  CreateBlogPost(model:AddBlogPost):Observable<void>{
    return this.client.post<void>(this.API_URL+'BlogPost',model)
  }

  GetBlogPost():Observable<BlogPost[]>{
    return this.client.get<BlogPost[]>(this.API_URL+'BlogPost');
  }

  GetBlogPostByID(id?:string):Observable<BlogPost>{
    return this.client.get<BlogPost>(this.API_URL+'BlogPost/'+id);
  }

  GetBlogPostByURL(url?:string):Observable<BlogPost>{
    return this.client.get<BlogPost>(this.API_URL+'BlogPost/'+url);
  }

  UpdateBlogPost(model:EditBlogPost):Observable<BlogPost>{
    return this.client.put<BlogPost>(this.API_URL+'BlogPost',model);
  }

  DeleteBlog(id:string):Observable<void>{
    return this.client.delete<void>(this.API_URL+'BlogPost/'+id);
  }


}
