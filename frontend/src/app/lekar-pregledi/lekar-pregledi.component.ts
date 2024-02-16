import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { LekarService } from '../services/lekar.service';
import { User } from '../models/user';
import { ZakazanPregled } from '../models/zakazani_pregledi';
import { Izvestaj } from '../models/izvestaji';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {
  constructor(private router: Router, private userService: UserService, private http: HttpClient, private lekarService: LekarService) { }
 
  korisnik: User;
  pregledi: ZakazanPregled[];
  obrazlozenje: string = "";
  idPregleda: number ;
  izvestaji: Izvestaj[];
  pacijent: string;
  izabrani: number;
  prethodniPregledi: ZakazanPregled[];



  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    });
    let svi = [];//za predstojece preglede
    let cnt = 0;

    let svi3 = [];
    let bezIzv = [];
    this.userService.dohvatiIzvestajeZaLekara(ulogovan).subscribe((pr: Izvestaj[])=>{
      pr.forEach(p=>{
        p.datum_vreme = new Date(p.datum_vreme);
        p.kontrola = new Date(p.kontrola);
        p.lekar_ime_prezime = this.korisnik.ime + " " + this.korisnik.prezime
        this.userService.getUser(p.pacijent).subscribe((k: User)=>{
          p.pacijent_ime_prezime = k.ime + " " + k.prezime;
        })
        svi3.push(p);
        
      });
      this.lekarService.dohvatiPredstojecePreglede(ulogovan).subscribe((pr: ZakazanPregled[])=>{
        pr.forEach(p=>{
          let flag = false;
          p.datum_vreme = new Date(p.datum_vreme);
          this.userService.getUser(p.pacijent).subscribe((k: User)=>{
            p.ime_prezime = k.ime + " " + k.prezime;
          })
          if(p.datum_vreme >= new Date() && cnt < 3){
            cnt++;
            svi.push(p);
          }
          if(p.datum_vreme >= new Date()){
            flag = true;
          }
          svi3.forEach(i=>{
            if(i.idPregleda === p.id) flag = true;
          })
          if(!flag) bezIzv.push(p);
          
        });
      });
    });
    this.izvestaji = svi3;
    this.pregledi = svi;
    this.prethodniPregledi = bezIzv;
  }
 
  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  uzmiId(id: number){
    this.idPregleda = id;
  }
  
  otkazi(){
    this.lekarService.otkaziPregled(this.idPregleda, this.obrazlozenje).subscribe((res)=>{
      this.ngOnInit();
    })
  }


  karton(pacijent: string){
    sessionStorage.setItem("pacijent", pacijent);
    this.router.navigate(['/lekar/pregledi/karton']);

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
    this.prethodniPregledi.forEach(pr=>{
      if(pr.id == this.izabrani){
        this.pacijent = pr.pacijent
      }
    })
    
    let kontrolaDatum = new Date(parseInt(this.datum.slice(this.datum.indexOf(".",this.datum.indexOf(".")+1)+1,10)), parseInt(this.datum.slice(this.datum.indexOf(".")+1,this.datum.indexOf(".",this.datum.indexOf(".")+1)))-1, parseInt(this.datum.slice(0,this.datum.indexOf("."))))
    this.lekarService.unesiIzvestaj(this.izabrani, this.korisnik.korisnickoIme, this.korisnik.spec, this.pacijent, this.razlog, this.dijagnoza, this.terapija, kontrolaDatum).subscribe((resp)=>{
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
