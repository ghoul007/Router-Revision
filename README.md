 
## Angular Router

### Use routerLink in html

 

With routerLinkActive

```html
<ul class="nav nav-tabs">
    <li role="presentation" class="active" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><a  routerLink="/">Home</a></li>
    <li role="presentation" routerLinkActive="active"><a  routerLink="/servers">Servers</a></li>
    <li role="presentation" routerLinkActive="active"><a routerLink="/users">Users</a></li>
</ul>
  ```

With params

```html
<a [routerLink]="['/users',user.id,user.name]">
```

With queryParams

```html
<a
  [routerLink]="['/servers',server.id]"
  [queryParams]="{allowEdit:server.id===3?'1':'0'}">
</a>
```


With fragment (#loading)

```html
<a
  [routerLink]="['/servers',server.id]"
  fragment="loading">
</a>
```


### Use navigate in Ts 

Relative path

```ts

this.router.navigate(['edit'],{relativeTo:this.route});
```

or 

```ts
this.router.navigate(['../'],{relativeTo:this.route});
```

With queryParams

```ts
this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'}});
```


With fragment (#loading)

```ts
this.router.navigate(['/servers',id,'edit'],{fragment:'loading'});
```



### Get Params or QueryParams from URL

* Params

    - ``` this.route.snapshot.params['id']```
    - ```ts this.route.params
      .subscribe(
        (param: Params) => {
          this.user.id = param['id'];
          this.user.name = param['name'];
      });```

* QueryParams

    - ``` this.route.snapshot.queryParams['id']```
    - ```ts this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.user.id = queryParams['id'];
          this.user.name = queryParams['name'];
      });```

### AuthGuard

#### CanActivate
Interface that a class can implement to be a guard deciding if a route can be activated. If all guards return true, navigation will continue. If any guard returns false, navigation will be cancelled
[See more](https://angular.io/api/router/CanActivate)

```ts
    constructor(private authService:AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> 
    {
        return this.authService.isAuthenticated()
        .then((authenticated:boolean)=>{
            if(authenticated)
                return true;
            else
                this.router.navigate(['/']);
        });
    }
  ```

  #### CanActivateChild

  Interface that a class can implement to be a guard deciding if a child route can be activated. If all guards return true, navigation will continue. If any guard returns false, navigation will be cancelled
[See more](https://angular.io/api/router/CanActivateChild)
  ```ts
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>
    {
        return this.canActivate(route,state);
    }
  ```


  in app-routing.module.ts 

  ```ts
    {path:'servers',
      // canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      component:ServersComponent,
      children:
      [
        {path:':id',component:ServerComponent},
        {path:':id/edit',component:EditServerComponent}
      ]
    },

  ```



  #### CanDeactivate

  Interface that a class can implement to be a guard deciding if a route can be deactivated. If all guards return true, navigation will continue. If any guard returns false, navigation will be cancelled.
[See more](https://angular.io/api/router/CanActivate)

  ```ts
import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactive{
    canDeactive:()=>  boolean | Observable<boolean> | Promise<boolean> ;
} 

export class CanDeactiveGuard implements CanDeactivate<CanComponentDeactive> {
    canDeactivate(
        component: CanComponentDeactive, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        nextState?: RouterStateSnapshot)
        : boolean | Observable<boolean> | Promise<boolean> {
         return component.canDeactive();
    }
}
```

in edit-server.component.ts
```ts
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
  ```


 #### Resolve
Interface that classes can implement to be a data provider. A data provider class can be used with the router to resolve data during navigation. The interface defines a resolve() method that will be invoked when the navigation start
[See more](https://angular.io/api/router/Resolve)


ServerResolver.ts
 ```ts
 interface Server{
    id:number;
    name:string;
    status:string;
}
@Injectable()

export class ServerResolver implements Resolve<Server> {
    constructor(private serversService:ServersService){}
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot)
        : 
        Server | Observable<Server> | Promise<Server> 
        {
            return this.serversService.getServer(+route.params['id']);
        }
}
```

in ServerComponent
```ts
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
  ```
