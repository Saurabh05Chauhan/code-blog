import { category } from "../../Category/Models/category";

export interface AddBlogPost
{
    Title:string;
    ShortDescription:string;
    Content:string;
    FeaturedImageURL:string;
    UrlHandle:string;
    Author:string;
    PublishedDate:Date;
    IsVisible:Boolean;
    Categories:String[];
}