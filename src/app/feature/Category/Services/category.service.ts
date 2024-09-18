import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddCategoryRequest } from '../Models/add-category-request-model';
import { Observable } from 'rxjs';
import { category } from '../Models/category';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL= environment.apiBaseUrl;
  constructor(private client:HttpClient,) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.client.post<void>(this.API_URL+'Categories',model);
  }

  getCategoryList(
    query?:string,
    sortBy?:string,
    sortDirection?:string,
    pageNumber?:number,
    pageSize?:number
  ):Observable<category[]>{
    
    let params= new HttpParams();

    if(query){
      params=params.set('query',query);
    }

    if(sortBy){
      params=params.set('sortBy',sortBy);
    }

    if(sortDirection){
      params=params.set('sortDirection',sortDirection);
    }

    if(pageNumber){
       params=params.set('pageNumber',pageNumber);
    }

    if(pageSize){
      params=params.set('pageSize',pageSize);
   }
    
    return this.client.get<category[]>(this.API_URL+'Categories',{params:params});
  }

  getCategoryById(id:string):Observable<category>{
    debugger
    return this.client.get<category>(this.API_URL+'Categories/'+id);
  }

  updateCategory(category:category):Observable<void>{
    return this.client.put<void>(this.API_URL+'Categories',category);
  }

  deleteCategory(id:string):Observable<void>{
    return this.client.delete<void>(this.API_URL+'Categories/'+id);
  }

  getCategoryCount():Observable<number>{
    return this.client.get<number>(this.API_URL+'Categories/count');
  }
}
