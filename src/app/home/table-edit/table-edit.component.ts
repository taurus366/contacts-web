import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnService} from "../../shared/conn.service";
import {CommonModule} from "@angular/common";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {IUSER} from "../../shared/interfaces/IUSER";

@Component({
  selector: 'app-table-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './table-edit.component.html',
  styleUrl: './table-edit.component.css'
})
export class TableEditComponent implements OnInit{


  constructor(private conn: ConnService) {
  }

  user: IUSER | undefined;

  ngOnInit(): void {
    if(this.idForEdit != undefined)
    this.fetchUserById(this.idForEdit);
  }

  @Output() eventEmitterHideEditWindow = new EventEmitter<void>();
  @Output() eventEmitterRefreshContacts = new EventEmitter<void>();

  @Input() idForEdit: number | undefined;

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
    this.eventEmitterHideEditWindow.emit();
  }


  update(form: NgForm) {

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

    let rs = form.value;
    rs['id'] = this.idForEdit;


      this.conn.putContact(rs).subscribe({
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
          this.eventEmitterHideEditWindow.emit();
          this.eventEmitterRefreshContacts.emit();
        }
      });

  }



  fetchUserById(id: number) {
    this.conn.getContactById(id).subscribe(value => {
      this.user = value.body!;
    })
  }
}
