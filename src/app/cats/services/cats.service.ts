import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { Cat } from '../interfaces/cats.intefase';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private pathCatsImages = "images/search"

  constructor(private webRequest: WebRequestService) { }


  getCatsImages(params?:Params):Observable<Array<Cat>>{
    return this.webRequest.getWithHeaders(this.pathCatsImages, params)
  }
}
