import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {ConnService} from "../../shared/conn.service";
import {BooleansService} from "../../shared/booleans.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isUsernameInCorrect: boolean = false;
  isPasswordInCorrect: boolean = false;


  constructor(private router: Router, private conn: ConnService, private boolService: BooleansService) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    if(form.invalid) {
      let formControl = form.controls;

      switch (formControl['username'].status){
        case "INVALID":
          this.isUsernameInCorrect = true;
          break;
        case "VALID":
          this.isUsernameInCorrect = false;
          break;
      }

      switch (formControl['password'].status) {
        case "INVALID":
          this.isPasswordInCorrect = true;
          break;
        case "VALID":
          this.isPasswordInCorrect = false;
          break;
      }

      return;
    }

      this.conn.login(form.value)
        .subscribe({
          next: value => {



          },
          error: err => {},
          complete: () => {
            this.boolService.isLogged = true;
            this.router.navigate(['home']).then(r => r);
          }
        })

  }
}
