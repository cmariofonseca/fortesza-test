import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatsService } from '../../services/cats.service';
import { Cat } from '../../interfaces/cats.intefase';

@Component({
  selector: 'app-cat-view',
  templateUrl: './cat-view.component.html',
  styleUrls: ['./cat-view.component.css'],
})
export class CatViewComponent implements OnInit {
  loader: boolean;
  id: string;
  cat: Cat;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private catsService: CatsService
  ) {}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.getCat();
  }

  getCat(): void {
    this.loader = true;
    this.catsService.getCat(this.id).subscribe(
      (response: Cat) => {
        this.cat = response;
        this.loader = false;
      },
      () => (this.loader = false)
    );
  }

  goBack() {
    this.route.navigateByUrl('/main');
  }
}
