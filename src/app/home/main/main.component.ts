import {Component, OnInit} from '@angular/core';
import {IUSER} from "../../shared/interfaces/IUSER";
import {TableAddComponent} from "../table-add/table-add.component";
import {TableEditComponent} from "../table-edit/table-edit.component";
import {ConnService} from "../../shared/conn.service";
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";
import {LogoutComponent} from "../../auth/logout/logout.component";

@Component({

  selector: 'app-main',
  standalone: true,
  imports: [
    TableAddComponent,
    TableEditComponent,
    CommonModule,
    NgForOf,
    NgFor,
    LogoutComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  user: IUSER[] | undefined;
  idForEdit: number | undefined;

  viewAddTable: boolean = false;
  viewEditTable: boolean = false;


  constructor(private conn: ConnService) {

  }

  ngOnInit(): void {
    this.fetchAllOrByFilter({});
  }

  editBtnClick(id: number, event: MouseEvent) {
    event.preventDefault();

    this.idForEdit = this.user?.find(u  => u.id === id)?.id ?? -1;

    if(this.idForEdit >= 0)
    this.viewEditTable = true;
    else
      this.onFieldsChange();
  }

  removeBtnClick(id: number, event: MouseEvent) {
    event.preventDefault();
    // could be shown message about deleting.
    this.conn.deleteContactById({id}).subscribe(value => {
      // could be made request to fetch info again for contacts but in this situation not necessary,
      // I just filter the id which is deleted
      this.user = this.user?.filter(value => value.id != id);
    });

  }

  addBtnClick(event: MouseEvent) {
    event.preventDefault();
    this.viewAddTable = true;
  }

  onFieldsChange(event? : MouseEvent) {
    event?.preventDefault();
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    let firstNameVal;
    let lastNameVal;

    if(firstName instanceof HTMLInputElement && lastName instanceof HTMLInputElement) {
      firstNameVal = firstName.value;
      lastNameVal = lastName.value
    } else return;


    this.fetchAllOrByFilter({
      'first_name': firstNameVal,
      'last_name': lastNameVal
    });

  }

  fetchAllOrByFilter(data: {}): void {
    this.conn.getAllContactsOrByFilter(data).subscribe(value => {
      this.user = value;
    });
  }


  hideAddWindow() {
    this.viewAddTable = false;
  }

  hideEditWindow() {
    this.viewEditTable = false;
  }
}
