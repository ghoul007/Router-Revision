 
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
