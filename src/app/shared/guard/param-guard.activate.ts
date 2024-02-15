import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {BooleansService} from "../booleans.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ParamGuardActivate {

  constructor(private router: Router, private booleanService: BooleansService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const {authenticationRequired , authenticationFailureRedirectUrl } = route.data;

    if(typeof authenticationRequired === 'boolean' && authenticationRequired && this.booleanService.isLogged) {
      return true;
    } else {
      console.log("test");
      return this.router.parseUrl( authenticationFailureRedirectUrl || 'login');
    }
  }

}
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const paramGuardActivate = new ParamGuardActivate(new Router(), new BooleansService());
  return <boolean>paramGuardActivate.canActivate(next, state);
}
