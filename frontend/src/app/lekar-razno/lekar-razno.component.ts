import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { LekarService } from '../services/lekar.service';

@Component({
  selector: 'app-lekar-razno',
  templateUrl: './lekar-razno.component.html',
  styleUrls: ['./lekar-razno.component.css']
})
export class LekarRaznoComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private lekarService: LekarService) { }
 
  korisnik: User;
  naziv: string;

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    });
  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  poruka: string = "";
  predlozi(){
    if(!this.naziv){
      this.poruka = "Morate uneti naziv pregleda."
      return;
    }
    this.lekarService.predloziPregled(this.naziv, this.korisnik.spec).subscribe((resp)=>{
      this.poruka = "Predlog je dodat."
      this.naziv = ""
    })
  }


  porukaS: string = "";
  slDan: string = "";

  slobodanDan(){
    if(!this.slDan){
      this.porukaS = "Morate uneti datum."
      return;
    }
    let datum = new Date(parseInt(this.slDan.slice(this.slDan.indexOf(".",this.slDan.indexOf(".")+1)+1,10)), parseInt(this.slDan.slice(this.slDan.indexOf(".")+1,this.slDan.indexOf(".",this.slDan.indexOf(".")+1)))-1, parseInt(this.slDan.slice(0,this.slDan.indexOf("."))));

    if(datum < new Date()){
      this.porukaS = "Ne mozete uzimati slobodne dane za datum koji je prosao."
      return;
    }
    this.lekarService.slobodanDan(datum, this.korisnik.korisnickoIme, "slobodan dan").subscribe((resp)=>{
      this.porukaS = "Slobodan dan je uspešno uzet."
    })

  }

  porukaG: string = "";
  odmor1: string = "";
  odmor2: string = "";

  odmor(){
    if(!this.odmor1 || !this.odmor2){
      this.porukaG = "Morate uneti datume."
      return;
    }
    let datum1 = new Date(parseInt(this.odmor1.slice(this.odmor1.indexOf(".",this.odmor1.indexOf(".")+1)+1,10)), parseInt(this.odmor1.slice(this.odmor1.indexOf(".")+1,this.odmor1.indexOf(".",this.odmor1.indexOf(".")+1)))-1, parseInt(this.odmor1.slice(0,this.odmor1.indexOf("."))));
    let datum2 = new Date(parseInt(this.odmor2.slice(this.odmor2.indexOf(".",this.odmor2.indexOf(".")+1)+1,10)), parseInt(this.odmor2.slice(this.odmor2.indexOf(".")+1,this.odmor2.indexOf(".",this.odmor2.indexOf(".")+1)))-1, parseInt(this.odmor2.slice(0,this.odmor2.indexOf("."))));
    if(datum1 < new Date()){
      this.porukaG = "Ne mozete uzimati odmor za datum koji je prosao."
      return;
    }
    if(datum2 < datum1){
      this.porukaG = "Datum do mora biti pre datuma od koga uzimate odmor."
      return;
    }
    let datum = datum1;
    while(datum <= datum2){
      this.lekarService.slobodanDan(datum, this.korisnik.korisnickoIme, "odmor").subscribe((resp)=>{
        
      })
      datum.setDate(datum.getDate()+1)
    }
    this.porukaG = "Godisnji odmor je uspešno uzet."
  }

  porukaB: string = "";
  bolovanje1: string = "";
  bolovanje2: string = "";

  bolovanje(){
    if(!this.bolovanje1 || !this.bolovanje2){
      this.porukaB = "Morate uneti datume."
      return;
    }
    let datum1 = new Date(parseInt(this.bolovanje1.slice(this.bolovanje1.indexOf(".",this.bolovanje1.indexOf(".")+1)+1,10)), parseInt(this.bolovanje1.slice(this.bolovanje1.indexOf(".")+1,this.bolovanje1.indexOf(".",this.bolovanje1.indexOf(".")+1)))-1, parseInt(this.bolovanje1.slice(0,this.bolovanje1.indexOf("."))));
    let datum2 = new Date(parseInt(this.bolovanje2.slice(this.bolovanje2.indexOf(".",this.bolovanje2.indexOf(".")+1)+1,10)), parseInt(this.bolovanje2.slice(this.bolovanje2.indexOf(".")+1,this.bolovanje2.indexOf(".",this.bolovanje2.indexOf(".")+1)))-1, parseInt(this.bolovanje2.slice(0,this.bolovanje2.indexOf("."))));
    if(datum1 < new Date()){
      this.porukaB = "Ne mozete uzimati bolovanje za datum koji je prosao."
      return;
    }
    if(datum2 < datum1){
      this.porukaB = "Datum do mora biti pre datuma od koga uzimate bolovanje."
      return;
    }
    let datum = datum1;
    while(datum <= datum2){
      this.lekarService.slobodanDan(datum, this.korisnik.korisnickoIme, "bolovanje").subscribe((resp)=>{
        
      })
      datum.setDate(datum.getDate()+1)
    }
    this.porukaB = "Bolovanje je uspešno uzeto."
  }

}
