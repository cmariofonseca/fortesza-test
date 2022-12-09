import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Breed, Cat } from '../../interfaces/cats.intefase';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  loader!: boolean;
  params: Params = {};
  breedsIds: string = '';
  cats: Array<Cat>;

  constructor(private catsService: CatsService) {}

  ngOnInit(): void {
    this.loader = true;
    this.getBreeds();
  }

  getBreeds(): void {
    this.catsService.getAllBreeds().subscribe((response: Array<Breed>) => {
      response.forEach((breed: Breed) => {
        this.breedsIds = this.breedsIds + `,${breed.id}`;
      });
      this.getFirstCats();
    },()=>this.loader = false);
  }

  getFirstCats(): void {
    this.loader = true;
    const params: Params = { limit: 15, breed_ids: this.breedsIds };
    this.catsService
      .getCatsbyBreed(params)
      .subscribe((response: Array<Cat>) => {
        this.cats = response;
        this.loader = false;
      },()=>this.loader = false);
  }

  getParamsSearch(event: any): void {
    if (event) {
      this.params = event;
      this.getCats();
    }
  }

  getCats(): void {
    this.loader = true;
    this.cats = [];
    this.catsService
      .getCatsbyBreed(this.params)
      .subscribe((response: Array<Cat>) => {
        this.cats = response;
        if (this.params.origin) this.filterCatsByOrigin(this.params.origin);
        this.loader = false;
      },()=>this.loader = false);
  }

  filterCatsByOrigin(origin: string): void {
    const auxCats: Array<Cat> = [];
    this.cats.forEach((cat: Cat) => {
      if (cat.breeds[0].origin === origin) {
        auxCats.push(cat);
      }
    });
    this.cats = auxCats;
  }
}
