import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { PacijentService } from '../services/pacijent.service';
import { User } from '../models/user';
import { ZakazanPregled } from '../models/zakazani_pregledi';
import { Izvestaj } from '../models/izvestaji';


@Component({
  selector: 'app-pacijent-pregledi',
  templateUrl: './pacijent-pregledi.component.html',
  styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private pacijentService: PacijentService) { }

  korisnik: User;
  pregledi: ZakazanPregled[];
  izvestaji: Izvestaj[];

  ngOnInit(): void {
 
    let svi = [] as ZakazanPregled[];
    let ulogovan = sessionStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
      
    });
    this.pacijentService.dohvatiPreglede(ulogovan).subscribe((pr: ZakazanPregled[])=>{
      let danas = new Date();
      pr.forEach(p=>{
        p.datum_vreme = new Date(p.datum_vreme);
        this.userService.getUser(p.lekar).subscribe((k: User)=>{
          p.ime_prezime = k.ime + " " + k.prezime;
        })
        if(p.datum_vreme >= danas){
          svi.push(p);
        }
      });
    });
    this.pregledi = svi;
    let svi2 = [];
    this.userService.dohvatiIzvestajeZaPacijenta(ulogovan).subscribe((pr: Izvestaj[])=>{
      pr.forEach(p=>{
        p.datum_vreme = new Date(p.datum_vreme);
        p.kontrola = new Date(p.kontrola);
        this.userService.getUser(p.lekar).subscribe((k: User)=>{
          p.lekar_ime_prezime = k.ime + " " + k.prezime;
        })
        svi2.push(p);
      });
    });
    this.izvestaji = svi2;
  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  otkazi(id: number){
    
    this.pacijentService.otkaziPregled(id).subscribe((res)=>{
      this.ngOnInit();
    })
  }

  stampaj(idPregleda: number){

  }

  stampajSve(){

  }

}
