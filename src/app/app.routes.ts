import { Routes } from '@angular/router';
import { CategoryListComponent } from './feature/Category/category-list/category-list.component';
import { AddCategoryComponent } from './feature/Category/add-category/add-category.component';
import { EditCategoryComponent } from './feature/Category/edit-category/edit-category.component';
import { BlogPostListComponent } from './feature/blog-post/blog-post-list/blog-post-list.component';
import { AddBlogPostComponent } from './feature/blog-post/add-blog-post/add-blog-post.component';
import { EditBlogPostComponent } from './feature/blog-post/edit-blog-post/edit-blog-post.component';
import { HomeComponent } from './feature/public/home/home.component';
import { BlogDetailsComponent } from './feature/public/blog-details/blog-details.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { AuthGuardService } from './shared/auth-guard.service';

export const routes: Routes = [
    {
        path:'',component:HomeComponent,canActivate:[AuthGuardService]
    },
    {
        path:'blog/:url',
        component:BlogDetailsComponent,canActivate:[AuthGuardService]
    },
    {
        path:'admin/categories', component: CategoryListComponent,canActivate:[AuthGuardService]
    },
    {
        path:'admin/categories/add',component:AddCategoryComponent,canActivate:[AuthGuardService]
    },
    {
        path:'admin/categories/:id',component:EditCategoryComponent,canActivate:[AuthGuardService]
    },
    {
        path:'admin/blogposts',component:BlogPostListComponent ,canActivate:[AuthGuardService]
    },
    {
        path:'admin/blogposts/add',component:AddBlogPostComponent,canActivate:[AuthGuardService]
    },
    {
        path:'admin/blogposts/:id',component:EditBlogPostComponent,canActivate:[AuthGuardService]
    },
    {
        // path:'login',component:LoginComponent
    }
];
