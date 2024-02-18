import { Injectable } from '@angular/core';

import {BooleansService} from "./booleans.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUSER} from "./interfaces/IUSER";

const api = environment.apiURL;
@Injectable({
  providedIn: 'root'
})


// "observe: 'response'"
// should be used when you need to access the entire HTTP response object, including its status, headers, and other metadata, in addition to the response body.

export class ConnService {

  constructor(private http: HttpClient, private booleanService: BooleansService) {
  }

  login(data: {username: string, password: string}) {
    return this.http.post(`${api}/admin/login`, data, {
      observe: 'response'
    })
  }

  logout() {
    return this.http.get(`${api}/admin/logout`)
  }
  //
  // deleteContactById(data: {id: number}) {
  //   return this.http.post(`${api}/users/delete/id=${data.id}`, {
  //     observe: 'response'
  //   })
  // }

  getAllContactsOrByFilter(data : {}) {
    let rs = "?";

    for (const [key, value] of Object.entries(data)) {
      const encoded = `${key}=${value}`

      rs += rs.length === 1 ? encoded : '&'+ encoded;
    }



    return this.http.get<IUSER[]>(`${api}/user/get/all${rs}`);
  }

  checkLoggedStatus() {
    return this.http.get(`${api}/admin/status`, {
      observe: 'response'
    })
  }



}
