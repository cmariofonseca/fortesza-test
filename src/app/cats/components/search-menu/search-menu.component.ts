import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Breed, Cat, Category } from '../../interfaces/cats.intefase';
import { limities } from '../../interfaces/params.interface';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css'],
})
export class SearchMenuComponent implements OnInit {
  @Output() cats = new EventEmitter<Array<Cat>>();
  @Output() params = new EventEmitter<any>();

  loader!: boolean;
  form!: FormGroup;
  breeds!: Array<Breed>;
  countries: Array<any> = [];
  limities: Array<number> = limities;
  categories: Array<Category>;

  constructor(
    private catsSerice: CatsService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getBreeds();
    this.getCategories();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      breed_ids: [''],
      limit: ['15'],
      origin: [''],
      category_ids: [''],
    });
  }

  getBreeds(): void {
    this.catsSerice.getAllBreeds().subscribe((response: Array<Breed>) => {
      this.countries = [];
      this.breeds = response;
      this.getContries(response);
    });
  }

  getCategories(): void {
    this.catsSerice.getAllCategories().subscribe((response:Array<Category>)=>{
      this.categories = response
    })
  }

  search(): void {
    const {category_ids, limit, ... rest} = this.form.value
    if(category_ids){
      const category = {category_ids:category_ids, limit:limit}
      this.params.emit(category);
    }else{
      rest.limit = limit;
      this.params.emit(rest);
    }
    this.clear()
  }


  getContries(breeds: Array<Breed>, country?: string): void {
    const countries: Array<string> = [];
    breeds.forEach((breeds) => {
      countries.push(breeds.origin);
    });
    const countriesFiltered = new Set(countries);
    this.countries = [...countriesFiltered];
  }

  clear():void{
    this.form.reset({limit: 15});
  }
}
