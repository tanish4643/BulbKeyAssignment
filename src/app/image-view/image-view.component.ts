import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  ratingValue: Number = 0;
  imageObj: any = {};
  loading: boolean = true;
  image_id: string;
  name: string = "";
  reason: string = "";
  formError: boolean = false;
  ratingFound: boolean = false;
  ratingObj: any;
  redirecting: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.image_id = params['id'];
        }
      );
    this.getImageDetails();
    this.fetchLocalComments();
  }

  fetchLocalComments(){
    var comments: any = localStorage.getItem('ratings');
    
    if(comments){
      comments = JSON.parse(comments);
      comments = comments.find(item => item.id == this.image_id);
      this.ratingFound = comments != undefined;
      this.ratingObj = comments;
    }
  }

  giveRating(){
    this.formError = false;

    if(this.name == "" || this.reason == "" || this.ratingValue == 0)
      this.formError = true;
    else{
      var rating = {
        id: this.image_id,
        rating: this.ratingValue,
        name: this.name,
        reason: this.reason
      };

      var comments: any = localStorage.getItem('ratings');
      if(comments)
        comments = JSON.parse(comments);
      else
        comments = [];

      comments.push(rating);
      localStorage.setItem('ratings', JSON.stringify(comments));
      this.ratingObj = rating;
      this.ratingFound = true;
      this.redirecting = true;

      setTimeout(() => {
        this.router.navigate(['/']);
      },2000);
    }
  }

  sliderChanged(e: any){
    this.ratingValue = parseInt(e.target.value);
  }

  counter(i: Number){
    return Array(i);
  }

  getImageDetails(){
    this.api.getImageDetails(this.image_id)
    .subscribe(data => {
      console.log(data);
      if(data.stat == "ok"){
        var d = data.photo;
        this.imageObj = {
          title: d.title._content,
          description: d.description._content,
          postedby: d.owner.realname,
          postedon: new Date(d.dates.taken).toDateString(),
          image_url: 'https://live.staticflickr.com/'+d.server+'/'+d.id+'_'+d.secret+'_c.jpg'
        };
        this.loading = false;
      }else this.router.navigate(['/']);
    });
  }

}
