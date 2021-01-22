import {Component} from '@angular/core';
import {CategoryService}  from '../../../Services/category.module'

@Component({
    selector: 'categories',
    templateUrl: 'categories.component.html',
    providers: [CategoryService]
})

export class CategoriesComponent {
    arrCate:any = []
    constructor(private cateService: CategoryService){
        cateService.getCaterogy().subscribe(data=>{
            console.log(data)
            this.arrCate = data
        })
    }
}