import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Cat } from '../../interfaces/cats.intefase';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  limit:number = 15;
  cats: Array<Cat>;

  constructor( private catsService: CatsService) { }

  ngOnInit(): void {
    const params:Params =  {limit: this.limit}
    this.catsService.getCatsImages(params).subscribe((response:Array<Cat>)=>{
      this.cats = response;
    })
  }

}
