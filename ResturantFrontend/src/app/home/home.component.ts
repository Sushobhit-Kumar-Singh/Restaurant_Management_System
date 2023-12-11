import { Component, OnInit } from '@angular/core';
import { ISuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: ISuggestedProduct[] = [
    {
      banerimage: 'banner/Banner_Lunch.jpeg',
      category: {
        id: 0,
        category: 'food',
        subCategory: 'dinner',
      },
    },
    {
      banerimage: 'banner/Baner_BreakFast.jpg',
      category: {
        id: 0,
        category: 'food',
        subCategory: 'breakfast',
      },
    },
    {
      banerimage: 'banner/Baner_FastFood.jpg',
      category: {
        id: 0,
        category: 'fastfood',
        subCategory: 'veg',
      },
    },
  ];

  ngOnInit(): void {}
}
