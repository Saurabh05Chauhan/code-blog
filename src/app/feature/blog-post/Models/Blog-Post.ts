import { category } from "../../Category/Models/category";

export interface BlogPost
{
    Id:string,
    Title:string;
    ShortDescription:string;
    Content:string;
    FeaturedImageURL:string;
    UrlHandle:string;
    Author:string;
    PublishedDate:Date;
    IsVisible:boolean;
    Categories: category[];
}