import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image-model';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit, OnDestroy {


  private file?:File;
  fileName:string='';
  title:string='';
  imageSub?:Subscription;
  images$?:Observable<BlogImage[]>;
/**
 *
 */
@ViewChild('form',{static:false}) imageUploadForm?:NgForm
constructor(private imageService:ImageService) {
  
}
  ngOnInit(): void {
    this.getImages();
  }
  

onFileUploadChange($event: Event):void {
  const element=event?.currentTarget as HTMLInputElement;
  this.file= element.files?.[0];
}

uploadImage() :void{
 if(this.file && this.fileName!='' && this.title!=''){
  this.imageSub=this.imageService.uploadImage(this.file,this.fileName,this.title).subscribe({
    next:(res)=>{
      this.imageUploadForm?.reset();
      this.getImages();

    }
  });
 }
  }

  private getImages(){
    this.images$=this.imageService.getAllImages();

  }

  onImageClick(url: string) {
    this.imageService.selectImage(url);
    }

  ngOnDestroy(): void {
    this.imageSub?.unsubscribe();
  }

}
