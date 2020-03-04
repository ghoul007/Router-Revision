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