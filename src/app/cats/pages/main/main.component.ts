import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { CatsService } from '../../services/cats.service';
import { Breed, Cat, Category } from '../../interfaces/cats.intefase';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  loader: boolean;
  breeds: Array<Breed>;
  categories: Array<Category>;
  countries: Array<any>;
  params: Params = {};
  breedsIds: string = '';
  cats: Array<Cat>;

  constructor(private catsService: CatsService) {}

  ngOnInit(): void {
    this.getBreeds();
    this.getCategories();
  }

  getBreeds(): void {
    this.loader = true;
    this.catsService.getAllBreeds().subscribe(
      (response) => {
        this.breeds = response;
        this.getContries(this.breeds);
        this.breeds.forEach((breed: Breed, index: number) => {
          if (index) {
            this.breedsIds = `${this.breedsIds},${breed.id}`;
          } else {
            this.breedsIds = breed.id;
          }
        });
        this.getFirstCats();
      },
      () => (this.loader = false)
    );
  }

  getFirstCats(): void {
    this.loader = true;
    const params: Params = { limit: 15, breed_ids: this.breedsIds };
    this.catsService.getCats(params).subscribe(
      (response: Array<Cat>) => {
        this.cats = response;
        this.loader = false;
      },
      () => (this.loader = false)
    );
  }

  getCategories(): void {
    this.loader = true;
    this.catsService.getAllCategories().subscribe(
      (response) => {
        this.categories = response;
        this.loader = false;
      },
      () => (this.loader = false)
    );
  }

  getParamsSearch(event: any): void {
    this.params = {};
    for (const key in event) {
      if (Object.prototype.hasOwnProperty.call(event, key)) {
        const element = event[key];
        if (element) {
          this.params[key] = element;
        }
      }
    }
    if (this.params && this.params.origin) {
      this.loader = true;
      this.cats = [];
      this.catsService
        .getCats({ limit: 100, breed_ids: this.breedsIds })
        .subscribe(
          (response) => {
            const catsByCountry = response.filter(
              (cat) => cat.breeds[0].country_code === this.params.origin
            );
            this.cats = catsByCountry.slice(0, this.params.limit);
            this.loader = false;
          },
          () => (this.loader = false)
        );
    } else {
      this.getCats();
    }
  }

  getCats(): void {
    this.loader = true;
    this.cats = [];
    this.catsService.getCats(this.params).subscribe(
      (response) => {
        this.cats = response;
        this.loader = false;
      },
      () => (this.loader = false)
    );
  }

  getContries(breeds: Array<Breed>): void {
    const countries: Array<any> = [];
    breeds.forEach((breed) => {
      countries.push({
        origin: breed.origin,
        country_code: breed.country_code,
      });
    });
    this.countries = this.removeDuplicateCountries(countries);
  }

  removeDuplicateCountries(countries) {
    const countriesMap = countries.map((country) => {
      return [country.origin, country];
    });
    return [...new Map(countriesMap).values()];
  }
}
