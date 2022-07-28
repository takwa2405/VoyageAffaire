import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-list-publication',
  templateUrl: './list-publication.component.html',
  styleUrls: ['./list-publication.component.css']
})
export class ListPublicationComponent implements OnInit {
  listPost2: any;
  listPost: any;
  title: any;
  contenue: any;
  constructor(private ForumServicesService: PublicationService) {
    this.get();
  }
  commentaire:any;
  // get all post with get comment by post and react by post
  get() {
  this.listPost=null;
  this.listPost2=null;
    this.ForumServicesService.getallpost().subscribe((list: any) => {
      // Boucle sur tout les post
      for (let index = 0; index < list.length; index++) {
        // get comment by id post dans le boucle
        this.ForumServicesService.getonecooment(list[index].idPublication).subscribe((list2: any) => {
          list[index].comments = list2;
        });
        // get recat by id post dans le boucle
        this.ForumServicesService.getonereact(list[index].idPublication).subscribe((list2: any) => {
          list[index].reacts = list2;
        })
      }
      this.listPost2 = list;
      this.listPost = list;
      console.log(this.listPost);

    })
  }
  addcomment(idpost:any){
    this.ForumServicesService.addommentbyidpost(idpost,this.commentaire).subscribe(list => {
              //refreh
      this.get();
      this.commentaire=''
    })
  }
  addreact(id:any) {    
      this.ForumServicesService.adreactbyidpost(id).subscribe(list => {
        //refreh
      this.get();
    })

  }
    //add post
  add() {
    let body = {
      // dans ngmodel html input
      "contenue": this.contenue,
      "title": this.title,
    }
    this.ForumServicesService.postallpost(body).subscribe(list => {
      console.log(list);
      this.get();
    })

  }
  //delete post
  delete(id: any) {
    console.log(id);


    this.ForumServicesService.deleteallpost(id).subscribe(list => {
      console.log(list);
      this.get();

    })
  }
  //update post
  update(id: any,contenue:string) {
    let body = {

      "contenue": contenue,
      "idcom":id
    }
    this.ForumServicesService.updatepost(id, body).subscribe(list => {
      console.log(list);
      this.change()

    })
  }
  SearchTitle: any;
  Search() {
    this.listPost = null
    if (this.SearchTitle == "") {
      //list temp fiha kol chay 
      this.listPost = this.listPost2
    }
    else {
      this.ForumServicesService.getallpostByTitle(this.SearchTitle).subscribe(list => {
        console.log(list);
        //list filter exist dans html ngfor
        this.listPost = list;
      })
    }


  }

  getpost(title: string) {

    this.ForumServicesService.getpost(title).subscribe(list => {
      console.log(list);
      this.get();

    })

  }
  deleteCommentire(id: any){  
    console.log(id);

    this.ForumServicesService.deleteCommentire(id).subscribe(list => {
      console.log(list);
      this.get();

    })


  }
  updateCommentaire(id: any){let body = {
    "contenue": this.contenue,
    "title": this.title,
  }
  this.ForumServicesService.updateCommentaire(id, body).subscribe(list => {
    console.log(list);
    this.get();

  })

  }


  ngOnInit(): void {
  }
// chart (stat)
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: any= {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    // DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };
show:boolean=false  
  change()
    {
this.show=! this.show

    }
  


  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();




  }
}
