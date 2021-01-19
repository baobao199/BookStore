import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MenuComponent} from './Components/Blocks/Menu/menu.component';
import {SliderComponet} from './Components/Blocks/Slider/slider.component';
import {UserComponent} from './Components/Blocks/User/user.component';
import {CategoriesComponent} from './Components/Blocks/Categories/categories.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SliderComponet,
    UserComponent,  
    CategoriesComponent,
  ],
  imports: [ //khai bao module
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
