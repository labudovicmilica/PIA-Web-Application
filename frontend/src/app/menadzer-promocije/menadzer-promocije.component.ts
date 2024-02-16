import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MenadzerService } from '../services/menadzer.service';

@Component({
  selector: 'app-menadzer-promocije',
  templateUrl: './menadzer-promocije.component.html',
  styleUrls: ['./menadzer-promocije.component.css']
})
export class MenadzerPromocijeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private menadzerService: MenadzerService) { }

  korisnik: User;
  akcija: string;
  rezultat:string = "";
  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  potvrdi(){
    if(!this.akcija){
      this.rezultat = "Morate uneti tekst."
      return;
    }
    this.rezultat = ""
    this.menadzerService.dodajAkciju(this.akcija).subscribe((res)=>{
      this.rezultat = "Akcija je dodata."
      this.akcija = "";
    })

  }

}
