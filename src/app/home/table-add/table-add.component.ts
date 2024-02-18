import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ConnService} from "../../shared/conn.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-table-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './table-add.component.html',
  styleUrl: './table-add.component.css'
})
export class TableAddComponent {


  constructor(private conn: ConnService) {
  }

  @Output() eventEmitterHideAddWindow = new EventEmitter<void>();
  @Output() eventEmitterRefreshContacts = new EventEmitter<void>();

  isFirstNameInCorrect: boolean = false;
  firstNameMessage: String = '';

  isLastNameInCorrect: boolean = false;
  lastNameMessage: String = '';

  isEmailAddressInCorrect: boolean = false;
  emailAddressMessage:String = '';

  isPhoneNumberInCorrect: boolean = false;
  phoneNumberMessage: String = '';

  hideWindow(event: MouseEvent) {
    event.preventDefault();
    this.eventEmitterHideAddWindow.emit();
  }

  add(form: NgForm) {
    if(form.invalid || (this.isFirstNameInCorrect ||
      this.isLastNameInCorrect ||
      this.isEmailAddressInCorrect ||
      this.isPhoneNumberInCorrect ||
      this.isEmailAddressInCorrect)) {
      let formControl = form.controls;

      switch (formControl['firstName'].status) {
        case 'INVALID':
          this.isFirstNameInCorrect = true;
          break;
        case "VALID":
          this.isFirstNameInCorrect = false;
          break;
      }


      switch (formControl['lastName'].status) {
        case 'INVALID':
          this.isLastNameInCorrect = true;
          break;
        case "VALID":
          this.isLastNameInCorrect = false;
          break;
      }

      switch (formControl['emailAddress'].status) {
        case 'INVALID':
          this.isEmailAddressInCorrect = true;
          break;
        case "VALID":
          this.isEmailAddressInCorrect = false;
          break;
      }

      switch (formControl['phoneNumber'].status) {
        case 'INVALID':
          this.isPhoneNumberInCorrect = true;
          break;
        case "VALID":
          this.isPhoneNumberInCorrect = false;
          break;
      }
      return;
    }

    this.conn.addNewContact(form.value).subscribe({
      error: err => {
      Array.from(err.error)
        .forEach(value => {

        // @ts-ignore
          let msg = value.defaultMessage;
          // @ts-ignore
          let fieldName = value.field;

          if(fieldName.includes('firstName')){
            this.isFirstNameInCorrect = true;
            this.firstNameMessage = msg;
          } else if(fieldName.includes('lastName')) {
            this.isLastNameInCorrect = true;
            this.lastNameMessage = msg;
          } else if(fieldName.includes('phoneNumber')) {
            this.isPhoneNumberInCorrect = true;
            this.phoneNumberMessage = msg;
          } else if(fieldName.includes('emailAddress')) {
            this.isEmailAddressInCorrect = true;
            this.emailAddressMessage = msg;
          }




        });
      },
      complete: () => {
        this.eventEmitterHideAddWindow.emit();
        this.eventEmitterRefreshContacts.emit();
      }
    })
  }

}
