 
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


### AuthGuard

#### CanActivate

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
  in HTML 


  #### CanActivateChild
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
