import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPublicationComponent } from './screens/list-publication/list-publication.component';

const routes: Routes = [{
  path: 'ListPub',
  component:  ListPublicationComponent,

},];
      
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
