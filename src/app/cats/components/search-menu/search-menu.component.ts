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

  loader!: boolean;
  form!: FormGroup;
  breeds!: Array<Breed>;

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
    });
  }

  getBreeds(): void {
    this.catsSerice.getAllBreeds().subscribe((response: Array<Breed>) => {
      this.breeds = response;
    });
  }

  search(): void {
    this.loader = true;
    const params: Params = this.form.value;
    params.limit = 15;
    this.catsSerice.getCatsbyBreed(params).subscribe((response: Array<Cat>) => {
      this.cats.emit(response);
      this.loader = false;
    });
  }
}
