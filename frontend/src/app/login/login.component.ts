import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  username: string = "";
  password: string = "";
  error: string = "";

  ngOnInit(): void {

  }

  login() {
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;

    }
    this.error = "";
    this.userService.login(this.username, this.password).subscribe((k: User) => {
      if (k) {
        if(k.status == "odbijen") {
          this.error = "Zahtev za registraciju je odbijen.";
          return;
        } else if(k.status == "cekanje") {
          this.error = "Zahtev za registraciju je na čekanju.\n Pokušajte kasnije.";
          return;
        } else if(k.status == "odobren") {
          sessionStorage.setItem("ulogovan", k.korisnickoIme);
          sessionStorage.setItem("uloga", k.tip);
          this.router.navigate([k.tip]);
        } else if(k.status == "obrisan"){
          this.error = "Vaš nalog je obrisan."
        } else{
          this.error = "Loši podaci!";
        }
      } else {
        this.error = "Loši podaci!";
        return;
      }
    })
  }

}
