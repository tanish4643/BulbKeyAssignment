import { Component, OnInit } from '@angular/core';
import { Gallery } from '../interfaces/Gallery';
import { ApiService } from '../api.service';

const Image_URL = "https://www.flickr.com/photos/";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  gallery: Gallery[] = [];
  loading: boolean = true;
  error: boolean = false;
  pageNumber: number = 1;
  comments: any;
  commentsArr: string[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.fetchLocalComments();
    this.getGallery();
  }

  loadData(page: number){
    this.pageNumber += page;
    this.getGallery();
  }

  fetchLocalComments(){
    var comments: any = localStorage.getItem('ratings');
    
    if(comments){
      comments = JSON.parse(comments);
      this.comments = comments;
      comments = comments.map(item => item.id);
      this.commentsArr = comments;
      console.log(this.commentsArr);
    }
  }

  counter(i: Number){
    return Array(i);
  }

  getGallery(){
    this.loading = true;
    this.error = false;
    this.gallery = [];

    this.api.getGallery('food',this.pageNumber)
    .subscribe(data => {
      if(data.stat == "ok")
        for (const d of (data.photos.photo as any)) {
          this.gallery.push({
            id: d.id,
            title: d.title,
            secret: d.secret,
            owner: d.owner,
            image_url: d.url_c
          });
          this.error = false;
        }
      else this.error = true;

      this.loading = false;
    });
  }

}
