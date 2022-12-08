import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Cat } from '../../interfaces/cats.intefase';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  loader!: boolean;
  limit: number = 15;
  params:any = {};
  cats: Array<Cat>;

  constructor(private catsService: CatsService) {}

  ngOnInit(): void {
    this.getFirstCats();
  }

  getFirstCats(): void {
    this.loader = true;
    const params: Params = { limit: this.limit };
    this.catsService.getCatsImages(params).subscribe((response: Array<Cat>) => {
      this.cats = response;
      this.loader = false;
    });
  }



  getParamsSearch(event:any):void{
    if(event) this.params = event;
  }
}
