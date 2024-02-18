import { Component } from '@angular/core';
import {ConnService} from "../../shared/conn.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {


  constructor(private conn: ConnService, private route: Router) {
  }

  logOut(ev: MouseEvent): void {
    ev.preventDefault();
    this.conn.logout().subscribe({
      complete: () => {
        this.route.navigate(['']);
      }
    });
  }
}
