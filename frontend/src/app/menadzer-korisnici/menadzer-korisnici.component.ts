import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MenadzerService } from '../services/menadzer.service';
import { User } from '../models/user';

@Component({
  selector: 'app-menadzer-korisnici',
  templateUrl: './menadzer-korisnici.component.html',
  styleUrls: ['./menadzer-korisnici.component.css']
})
export class MenadzerKorisniciComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private menadzerService: MenadzerService) { }

  korisnik: User;
  korisnici: User[];


  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })

    this.menadzerService.dohvatiSve().subscribe((z: User[])=>{
      this.korisnici = z;
    })
  }

  
  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  obrisi(korisnickoIme: string){
    this.menadzerService.obrisi(korisnickoIme).subscribe((resp)=>{
      this.ngOnInit()
    })

  }

  azuriraj(korisnickoIme: string){
    sessionStorage.setItem("klijent", korisnickoIme);
    this.router.navigate(['menadzer/korisnici/azuriranje']);

  }



  dodajLekara(){
    this.router.navigate(['menadzer/korisnici/dodaj-lekara'])
  }


}
