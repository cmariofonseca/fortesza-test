import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Cat } from '../../interfaces/cats.intefase';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() cats: Array<Cat>;

  constructor() {}

  ngOnInit(): void {}
}
