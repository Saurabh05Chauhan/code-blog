import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageSelected:BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private http:HttpClient) { }

  uploadImage(file:File,fileName:string,title:string):Observable<BlogImage>{
    const formData=new FormData();
    formData.append('file',file);
    formData.append('fileName',fileName);
    formData.append('title',title);

    return this.http.post<BlogImage>(environment.apiBaseUrl+'Images',formData);
  }

  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(environment.apiBaseUrl+'Images');
  }

  selectImage(url:string):void{
    this.imageSelected.next(url);
  }

  onSelectImage():Observable<string>{
    return this.imageSelected.asObservable();
  }
}
