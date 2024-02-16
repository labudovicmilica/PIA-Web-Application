import { Component, OnInit } from '@angular/core';
import { Izvestaj } from '../models/izvestaji';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { LekarService } from '../services/lekar.service';
import { User } from '../models/user';
import { Pregled } from '../models/pregledi';
import { PacijentService } from '../services/pacijent.service';
import { ZakazanPregled } from '../models/zakazani_pregledi';

@Component({
  selector: 'app-lekar-karton',
  templateUrl: './lekar-karton.component.html',
  styleUrls: ['./lekar-karton.component.css']
})
export class LekarKartonComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private lekarService: LekarService, private pacijentService: PacijentService) { }
 
  korisnik: User; 
  izvestaji: Izvestaj[];
  pacijent: User;
  pregledi: ZakazanPregled[];
  izabrani: number;

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");
    let pac = sessionStorage.getItem("pacijent")
    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    });
    this.userService.getUser(pac).subscribe((k: User)=>{
      this.pacijent = k;
    });
    let svi = [];
    this.userService.dohvatiIzvestajeZaPacijenta(pac).subscribe((pr: Izvestaj[])=>{
      pr.forEach(p=>{
        p.datum_vreme = new Date(p.datum_vreme);
        p.kontrola = new Date(p.kontrola);
        this.userService.getUser(p.lekar).subscribe((k: User)=>{
          p.lekar_ime_prezime = k.ime + " " + k.prezime;
        })
        svi.push(p);
      });
    });
    this.izvestaji = svi;
    let bezIzv = [];
    
    this.pacijentService.dohvatiPreglede(pac).subscribe((pregled: ZakazanPregled[])=>{
      pregled.forEach(pr=>{
        let flag = false;
        pr.datum_vreme = new Date(pr.datum_vreme);
        if(new Date(pr.datum_vreme) > new Date() || pr.lekar !== this.korisnik.korisnickoIme) flag = true;
        this.izvestaji.forEach(i=>{
          if(i.idPregleda === pr.id) flag = true;
        })
        if(!flag) bezIzv.push(pr);
      })
    });
    this.pregledi = bezIzv;
  }


  odjaviSe() { 
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  dugmence = true;
  flag = false;
  dugme(){
    this.dugmence = false;
  }
  prikazi(){
    this.flag = true;
  }
   

  razlog: string = "";
  dijagnoza: string = "";
  terapija: string = "";
  datum: string = "";

  unesiIzvestaj(){
    
    let kontrolaDatum = new Date(parseInt(this.datum.slice(this.datum.indexOf(".",this.datum.indexOf(".")+1)+1,10)), parseInt(this.datum.slice(this.datum.indexOf(".")+1,this.datum.indexOf(".",this.datum.indexOf(".")+1)))-1, parseInt(this.datum.slice(0,this.datum.indexOf("."))))
    this.lekarService.unesiIzvestaj(this.izabrani, this.korisnik.korisnickoIme, this.korisnik.spec, this.pacijent.korisnickoIme, this.razlog, this.dijagnoza, this.terapija, kontrolaDatum).subscribe((resp)=>{
      this.razlog = "";
      this.dijagnoza = "";
      this.terapija = "";
      this.datum = "";
      this.dugmence = true;
      this.flag = false;
      this.ngOnInit();
    })

  }

  

}
