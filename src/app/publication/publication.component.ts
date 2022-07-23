import { Component, OnInit } from '@angular/core';
import { ForumServicesService } from '../services/forum-services.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  listPost:any;
  title;
  contenue;
  constructor(private ForumServicesService :ForumServicesService) {
    this.get();
   }
get(){
  this.ForumServicesService.getallpost().subscribe(list=>{
    console.log(list);
    
    this.listPost=list;
  })
}
   add(){
    let body ={
      "contenue":this.contenue ,
       "title": this.title ,
     }
    this.ForumServicesService.postallpost(body).subscribe(list=>{
      console.log(list);
      this.get();
    })
 
   }
   delete(id){
   
    this.ForumServicesService.deleteallpost(id).subscribe(list=>{
      console.log(list);
      this.get();

    })
   }
   getpost(title){
   
    this.ForumServicesService.getpost(title).subscribe(list=>{
      console.log(list);
      this.get();

    })
  }
  
  ngOnInit(): void {
  }


   }
