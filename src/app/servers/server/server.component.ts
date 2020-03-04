import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
// import { Subscription } from 'rxjs';


@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  //paramSubscription:Subscription;
  
  constructor(private serversService: ServersService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data:Data)=>{
        this.server=data['serverResolved'];
      }
    );
  }

    // Commenting the below code as we are using resolver to get server details
    // const id=+this.route.snapshot.params['id'];
    // this.server =this.serversService.getServer(id);
    
    // this.paramSubscription= this.route.params.subscribe(
    //   (params:Params)=>{
    //     this.server =this.serversService.getServer(+params['id']);
    //   });     
  // }
  // ngOnDestroy(){
  //   this.paramSubscription.unsubscribe();
  // }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'});
  }
}