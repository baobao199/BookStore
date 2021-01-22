import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommonModule} from '@angular/common';

import {HomeComponent} from './Components/Pages/Home/home.component';
import {CategoryComponent} from './Components/Pages/Categories/category.component'
import {DetailComponent} from './Components/Pages/Detail/detail.component'

const routesConfig: Routes = [
  {path:'category',component: CategoryComponent},
  {path:'detail',component: DetailComponent},
  {path:'detail/:id',component: DetailComponent},
  {path:'**', component: HomeComponent} //default direct Home
]

@NgModule({
  declarations:[
    HomeComponent, DetailComponent, CategoryComponent
  ],
  imports: [
    RouterModule.forRoot(routesConfig),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
