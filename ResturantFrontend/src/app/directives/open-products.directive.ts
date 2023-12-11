import { Directive, HostListener, Input } from '@angular/core';
import { ICategory } from '../models/models';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Directive({
  selector: '[OpenProducts]'
})
export class OpenProductsDirective {

  @Input() category: ICategory = {
    id: 0,
    category: '',
    subCategory: '',
  }


  @HostListener('click') openProducts() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: this.category.category,
        subcategory: this.category.subCategory,
      },
    });
  }

  constructor(private router: Router) { }

}
