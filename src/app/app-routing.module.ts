import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageViewComponent } from './image-view/image-view.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'image/:id', component: ImageViewComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
