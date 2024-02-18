import { Injectable } from '@angular/core';

import {BooleansService} from "./booleans.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const api = environment.apiURL;
@Injectable({
  providedIn: 'root'
})




export class ConnService {

  constructor(private http: HttpClient, private booleanService: BooleansService) {
  }

  login(data: {username: string, password: string}) {
    return this.http.post(`${api}/admin/login`, data, {
      observe: 'response'
    })
  }

  // logout() {
  //   return this.http.get(`${api}/admin/logout`, {
  //     observe: 'response'
  //   })
  // }
  //
  // deleteContactById(data: {id: number}) {
  //   return this.http.post(`${api}/users/delete/id=${data.id}`, {
  //     observe: 'response'
  //   })
  // }

  checkLoggedStatus() {
    return this.http.get(`${api}/admin/status`, {
      observe: 'response'
    })
  }



}
