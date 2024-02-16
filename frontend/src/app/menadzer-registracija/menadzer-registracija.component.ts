import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MenadzerService } from '../services/menadzer.service';
import { User } from '../models/user';

@Component({
  selector: 'app-menadzer-registracija',
  templateUrl: './menadzer-registracija.component.html',
  styleUrls: ['./menadzer-registracija.component.css']
})
export class MenadzerRegistracijaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private menadzerService: MenadzerService) { }

  korisnik: User;
  zahtevi: User[];


  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })

    this.menadzerService.dohvatiZahteveZaRegistraciju().subscribe((z: User[])=>{
      this.zahtevi = z;
    })
  }

  
  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  prihvati(korisnickoIme: string){
    this.menadzerService.odgovorNaZahtev(korisnickoIme, true).subscribe((res)=>{
      this.ngOnInit();
    })

  }

  odbij(korisnickoIme: string){
    this.menadzerService.odgovorNaZahtev(korisnickoIme, false).subscribe((res)=>{
      this.ngOnInit();
    })
  }


}
