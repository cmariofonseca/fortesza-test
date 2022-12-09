import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { Breed, Cat, Category } from '../interfaces/cats.intefase';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private pathCatsImages = 'images/search';
  private pathCatBreed = 'breeds';
  private pathCatCategories = 'categories';

  constructor(private webRequest: WebRequestService) {}

  getCat(id:string):Observable<Cat>{
    return this.webRequest.getWithHeaders(`images/${id}`)
  }

  getCatsImages(params?: Params): Observable<Array<Cat>> {
    return this.webRequest.getWithHeaders(this.pathCatBreed, params);
  }

  getAllBreeds(): Observable<Array<Breed>> {
    return this.webRequest.getWithHeaders(this.pathCatBreed);
  }

  getCatsbyBreed(params?: Params): Observable<Array<Cat>> {
    return this.webRequest.getWithHeaders(this.pathCatsImages, params);
  }

  getAllCategories():Observable<Array<Category>>{
    return this.webRequest.getWithHeaders(this.pathCatCategories);
  }
}
