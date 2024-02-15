import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooleansService {

  constructor() { }


  private _isLogged: boolean = false;


  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }
}
