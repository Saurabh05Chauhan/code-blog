import { category } from "../../Category/Models/category";

export interface BlogPost
{
    id:string,
    title:string;
    shortDescription:string;
    content:string;
    featuredImageURL:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
    categories: category[];
}