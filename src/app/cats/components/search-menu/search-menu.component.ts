import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Breed, Category } from '../../interfaces/cats.intefase';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css'],
})
export class SearchMenuComponent implements OnInit {
  @Input() breeds: Array<Breed>;
  @Input() countries: Array<any>;
  @Input() categories: Array<Category>;
  @Output() params = new EventEmitter<any>();

  loader: boolean;
  form: FormGroup;
  limities: Array<number> = [5, 10, 15];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.form = this.formBuilder.group({
      breed_ids: [''],
      limit: ['15'],
      origin: [''],
      category_ids: [''],
    });
  }

  search(): void {
    this.params.emit(this.form.value);
    this.clear();
  }

  clear(): void {
    this.form.reset();
    this.form.patchValue({ limit: 15 });
  }
}
