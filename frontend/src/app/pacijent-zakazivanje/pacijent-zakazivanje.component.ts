import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { PacijentService } from '../services/pacijent.service';
import { User } from '../models/user';
import { Pregled } from '../models/pregledi';

@Component({
  selector: 'app-pacijent-zakazivanje',
  templateUrl: './pacijent-zakazivanje.component.html',
  styleUrls: ['./pacijent-zakazivanje.component.css']
})
export class PacijentZakazivanjeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private pacijentService: PacijentService) { }

  korisnik: User;
  lekar: User;
  pregled: Pregled;
  datum: string;
  vreme: string;
  rezultat: string = "";
  datum2: string = "";
  datum3: string = "";
  vreme2: string = "";
  sati: string = "";

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
    let dr = sessionStorage.getItem("lekar");
    this.userService.getUser(dr).subscribe((k: User)=>{
      this.lekar = k;
      let pr = sessionStorage.getItem("pregled")
      this.userService.dohvatiPregled(pr, this.lekar.spec).subscribe((l: Pregled)=>{
        this.pregled = l;
      });
    });

    
  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  zakazi(){
    this.rezultat = "";
    if(!this.datum || !this.vreme){
      this.rezultat = "Morate uneti datum i vreme pregleda."
      return;
    }
    let date = new Date(parseInt(this.datum.slice(this.datum.indexOf(".",this.datum.indexOf(".")+1)+1,10)), parseInt(this.datum.slice(this.datum.indexOf(".")+1,this.datum.indexOf(".",this.datum.indexOf(".")+1)))-1, parseInt(this.datum.slice(0,this.datum.indexOf("."))), parseInt(this.vreme.slice(0,2)), parseInt(this.vreme.slice(this.vreme.indexOf(":")+1)));
    if(parseInt(this.datum.slice(this.datum.indexOf(".")+1,this.datum.indexOf(".",this.datum.indexOf(".")+1))) > 12 || parseInt(this.datum.slice(0,this.datum.indexOf("."))) > 31){
      this.rezultat = "Izabrani datum ne postoji."
      return;
    }
    if(date.toString() === "Invalid Date"){
      this.rezultat = "Podaci nisu u dobrom formatu."
      return;
    }
    if(date < new Date()){
      this.rezultat = "Izabrani datum je prošao, izaberite neki drugi."
      return;
    }
    if(parseInt(this.vreme.slice(0,2)) < 7 || (parseInt(this.vreme.slice(0,2)) >= 22)) {
      this.rezultat = "Radno vreme je od 7 do 22h, molimo Vas da izaberete drugo vreme."
      return;
    }

    this.pacijentService.zakaziPregled(this.korisnik.korisnickoIme, this.lekar.korisnickoIme, this.pregled.naziv, date, this.lekar.ogranak, this.pregled.trajanje, this.lekar.spec).subscribe((resp)=>{
      if(resp['message'] === 'ok'){
        this.rezultat = "Pregled je zakazan."
      } else{
        this.rezultat = "Pregled nije zakazan, jer je termin zauzet."
      }
    })
    
    
    
    /*this.datum2 = date.toLocaleString();
    this.datum2 = this.datum2.slice(0,this.datum2.lastIndexOf(":"));

    this.datum2 = date.toJSON();
    this.datum3 = new Date(this.datum2).toLocaleString();
    this.vreme2 = new Date(this.datum2).toLocaleTimeString();
    this.sati = (new Date(this.datum2).getHours()).toString();*/
  }

}
