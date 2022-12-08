import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Params } from '@angular/router';

import { Breed, Cat } from '../../interfaces/cats.intefase';
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

  constructor(
    private catsSerice: CatsService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getBreeds();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      breed_ids: [''],
      origin: ['']
    });
  }


  getBreeds(): void {
    this.catsSerice.getAllBreeds().subscribe((response: Array<Breed>) => {
      this.countries = [];
      this.breeds = response;
      this.getContries(response)
    });
  }

  search(): void {

    this.params.emit(this.form.value)

  }

  getContries(breeds:Array<Breed>, country?:string):void{
    const countries: Array<string> = []
    breeds.forEach((breeds)=>{
     countries.push(breeds.origin) 
    })
    const countriesFiltered = new Set(countries);
    this.countries = [...countriesFiltered]
  }
}
