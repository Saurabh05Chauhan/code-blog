export interface EditBlogPost
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
    Categories: string[];
}