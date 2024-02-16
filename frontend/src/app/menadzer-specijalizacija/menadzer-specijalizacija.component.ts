import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MenadzerService } from '../services/menadzer.service';
import { User } from '../models/user';
import { Pregled } from '../models/pregledi';
import { Specijalizacija } from '../models/specijalizacije';
import { LekarService } from '../services/lekar.service';
import { PredlogPregleda } from '../models/predlozi_pregleda';

@Component({
  selector: 'app-menadzer-specijalizacija',
  templateUrl: './menadzer-specijalizacija.component.html',
  styleUrls: ['./menadzer-specijalizacija.component.css']
})
export class MenadzerSpecijalizacijaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private menadzerService: MenadzerService, private lekarService: LekarService) { }

  korisnik: User;
  novaSpec: string = "";
  specijalizacije: Map<string, Array<Pregled>>;
  izabrana: string;
  zahtevi: PredlogPregleda[];

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
    let mapa = new Map();
    this.menadzerService.dohvatiSveSpec().subscribe((sveSpec: Specijalizacija[])=>{
      sveSpec.forEach(spec => {
        this.lekarService.dohvatiPreglede(spec.naziv).subscribe((pr: Pregled[])=>{
          mapa.set(spec.naziv, pr);
        })
      });
    })
    this.specijalizacije = mapa;

    this.menadzerService.zahteviZaPreglede().subscribe((resp: PredlogPregleda[])=>{
      this.zahtevi = resp;
    })

  }
  
  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }
  errSpec: string = "";
  specRez: string = ""
  dodajSpec(){
    if (this.novaSpec === "") {
      this.errSpec = "Morate uneti ime specijalizacije.";
      return;
    }
    this.errSpec = "";
    this.menadzerService.dodajSpec(this.novaSpec).subscribe((resp)=>{
      this.novaSpec = ""
      this.specRez = "Specijalizacija je dodata."
    })

  }

  obrisi(naziv: string){
    this.menadzerService.onemoguciPregled(naziv, this.izabrana).subscribe((res)=>{
      this.ngOnInit()
    })

  }
  menjanje: Pregled = new Pregled();
  staraCena: number;

  azuriraj(pregled: Pregled){
    this.menjanje = pregled;
    this.staraCena = pregled.cena;

  }

  azurirajPotvrda(){
    if (!this.menjanje.trajanje) this.menjanje.trajanje = 30;
    this.menadzerService.azurirajPregled(this.menjanje.naziv, this.menjanje.spec, this.menjanje.trajanje, this.menjanje.cena, this.staraCena).subscribe((resp)=>{
      this.ngOnInit();
    })

  }

  odabrano = true;
  dis(){
    if(this.odabrano==true) return true;
    else return false;
  }

  flag(){
    this.odabrano = false;
  }

  naziv: string;
  cena: number;
  trajanje: number;



  dodajPregled(){
    if(!this.trajanje){
      this.trajanje2 = 30
    }
    if(this.trajanje > 0 && this.cena > 0){
      this.menadzerService.dodajPregled(this.izabrana, this.naziv, this.cena, this.trajanje).subscribe((resp)=>{
        this.trajanje = null;
        this.cena = null;
        this.naziv = "";
        this.ngOnInit();
      })
    }
  }

  vr(){
    if (this.trajanje <=0 || this.cena <= 0){
      return false;
    }
    else{
      return true;
    }
  }

  prihvati(zahtev: PredlogPregleda){
    this.prihv = zahtev;

  }

  odbij(zahtev: PredlogPregleda){
    this.menadzerService.odbijPregled(zahtev.spec, zahtev.naziv).subscribe((resp)=>{
      this.ngOnInit()
    })
  }


  trajanje2: number;
  cena2: number;
  prihv: PredlogPregleda = new PredlogPregleda();
  prihvatiPregled(){
    if(!this.trajanje2){
      this.trajanje2 = 30
    }
    if(this.trajanje2 > 0 && this.cena2 > 0){
      this.menadzerService.dodajPregled(this.prihv.spec, this.prihv.naziv, this.cena2, this.trajanje2).subscribe((resp)=>{

      })
      this.menadzerService.odbijPregled(this.prihv.spec, this.prihv.naziv).subscribe(resp2=>{
        this.ngOnInit();
      })
    }
  }
}
