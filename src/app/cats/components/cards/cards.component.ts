import { Component, Input, OnInit } from '@angular/core';
import { Cat } from '../../interfaces/cats.intefase';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input('cats') set setCats(cats: Array<Cat>) {
    this.cats = cats;
    this.showGallery = true;
    if (this.cats && this.cats.length === 0) {
      this.showGallery = false;
    }
  }

  cats: Array<Cat> = [];
  showGallery: boolean;

  constructor() {}

  ngOnInit(): void {}
}
