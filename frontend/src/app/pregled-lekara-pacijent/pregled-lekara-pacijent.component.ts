import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PacijentService } from '../services/pacijent.service';

@Component({
  selector: 'app-pregled-lekara-pacijent',
  templateUrl: './pregled-lekara-pacijent.component.html',
  styleUrls: ['./pregled-lekara-pacijent.component.css']
})
export class PregledLekaraPacijentComponent implements OnInit {

  constructor(private router: Router, private pacijentService: PacijentService, private userService: UserService) { }

  lekari: User[];

  ime: string = "";
  prezime: string = "";
  spec: string = "";
  ogranak :string = "";

  korisnik: User;

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })

    this.userService.dohvatiLekare("", "", "").subscribe((users: User[])=>{
      this.lekari = users;
    })

  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  pretraga() {
    this.pacijentService.dohvatiLekare(this.ime, this.prezime, this.spec, this.ogranak).subscribe((users: User[])=>{
      this.lekari = users;
    })
  }

  sortirajIme(flag: boolean){

    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.ime, b.ime))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.ime, a.ime))
    }
  }

  mojSort(a: string, b: string){
    if(a>b) return 1;
    else if(b>a) return -1;
    else return 0;
  }

  sortirajPrezime(flag: boolean){
    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.prezime, b.prezime))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.prezime, a.prezime))
    }
  }

  sortirajSpec(flag: boolean){
    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.spec.toLowerCase(), b.spec.toLowerCase()))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.spec.toLowerCase(), a.spec.toLowerCase()))
    }
  }

  sortirajOgranak(flag: boolean){
    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.ogranak, b.ogranak))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.ogranak, a.ogranak))
    }
  }

  prikazLekara(korisnickoIme: string){
    sessionStorage.setItem("lekar", korisnickoIme);
    this.router.navigate(['pacijent/lekari/prikaz']);

  }

}
