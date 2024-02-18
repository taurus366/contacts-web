import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooleansService {

  constructor() { }

  // I am not using it yet but for future it could be a helper for smth.
  private _isLogged: boolean = false;

  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }
}
