import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gallery } from './interfaces/Gallery';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'content-type: application/json',
    'Accept': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = '9219ee5e9f9f65974df33cf0f7f5df40';
  BASE_URL = 'https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/rest/?method=';
  FORMAT = '&format=json&nojsoncallback=?';

  galleryURL = 'flickr.photos.search&api_key=' 
                + this.API_KEY + '&media=photos&extras=url_c'
                + '&per_page=30&page=';
  photoInfo = 'flickr.photos.getInfo&api_key=' + this.API_KEY + '&extras=url_c';

  constructor(private http: HttpClient) { }

  getGallery(tag: String,page: number): any {
    return  this.http.get<any>(this.BASE_URL+this.galleryURL+page+'&tags='+tag+this.FORMAT);
  }

  getImageDetails(photo_id: String): any {
    return  this.http.post<any>(this.BASE_URL+this.photoInfo+'&photo_id='+photo_id+this.FORMAT, httpOptions);
  }
}
