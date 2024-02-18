import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {generate, Observable} from "rxjs";
import {BooleansService} from "../booleans.service";
import {inject, Injectable} from "@angular/core";
import {ConnService} from "../conn.service";
import {resolve} from "@angular/compiler-cli";

@Injectable()
export class ParamGuardActivate {

  constructor(private router: Router, private booleanService: BooleansService, private conn: ConnService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const {authenticationRequired , authenticationFailureRedirectUrl } = route.data;

    let isAuthorized: boolean = false;

    let promise = new Promise((resolve, reject) => {
      this.conn.checkLoggedStatus().subscribe({
        // next: value => {
        // },
        error: err => {
          isAuthorized = false;
          resolve(true);
        },
        complete: () => {
          isAuthorized = true;
          resolve(true)
        }
      });
    });

    if(typeof authenticationRequired === 'boolean' && authenticationRequired)
   return promise
      .then(() => {
        this.booleanService.isLogged = isAuthorized;
        if(isAuthorized) {
          return true;
        } else {
          return this.router.parseUrl( authenticationFailureRedirectUrl || 'login');
        }
      });
    else
      return true;


  }

}
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  let logged = inject(BooleansService);
  let connService = inject(ConnService);
  const paramGuardActivate = new ParamGuardActivate(new Router(), logged, connService);
  return <boolean>paramGuardActivate.canActivate(next, state);
}
