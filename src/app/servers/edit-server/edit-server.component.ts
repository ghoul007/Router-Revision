import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactive } from './can-deactive-guard-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,CanComponentDeactive  {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit=false;
  changesSaved=false;
  paramSubscription:Subscription;
  constructor(private serversService: ServersService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.queryParams
        .subscribe(
          (queryParams:Params)=>{
            this.allowEdit=queryParams['allowEdit']==='1'?true:false;
          }
        );
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    //Subscribe to route params to update the ID if the params change.
  
    this.paramSubscription= this.route.params.subscribe(
      (params:Params)=>{
        this.server =this.serversService.getServer(+params['id']);
      });     
  
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }
  
  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved=true;
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  canDeactive(): boolean | Observable<boolean> | Promise<boolean>
  {
   if(!this.allowEdit)
      return false;    // continue to deactivate
   if(
    (this.serverName!=this.server.name || this.serverStatus!=this.server.status)
      &&
    !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    }
    else{
      return true;
    }
  }
}
