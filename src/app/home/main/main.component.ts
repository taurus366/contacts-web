import {Component, OnInit} from '@angular/core';
import {IUSER} from "../../shared/interfaces/IUSER";
import {TableComponent} from "../table/table.component";
import {TableAddComponent} from "../table-add/table-add.component";
import {TableEditComponent} from "../table-edit/table-edit.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TableComponent,
    TableAddComponent,
    TableEditComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  user: IUSER | undefined;

  ngOnInit(): void {

  }

}
