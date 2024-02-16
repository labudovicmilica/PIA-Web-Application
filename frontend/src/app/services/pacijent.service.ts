import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZakazanPregled } from '../models/zakazani_pregledi';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/pacijent'

  izmeni(ime: string, prezime: string, korisnickoIme: string, lozinka: string, mejl: string, adresa: string, telefon: string, ime_slike: string, tip: string, pregledi: Array<String>) {
    let data = {
      ime: ime,
      prezime: prezime,
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      mejl: mejl,
      telefon: telefon,
      adresa: adresa,
      slika: ime_slike,
      tip: tip,
      licenca: null,
      spec: null,
      ogranak: null,
      status: tip=="menadzer"?"":"odobren",
      pregledi: pregledi

    }

    return this.http.post(`${this.uri}/izmeni`, data)
  }


  promeniSliku(korisnickoIme: string, slika: string){
    let data = {
      korisnickoIme: korisnickoIme,
      slika: slika
    }

    return this.http.post(`${this.uri}/promeniSliku`, data)
  } 

  dohvatiLekare(ime: string, prezime: string, spec: string, ogranak: string) {
    let data = {
      ime: ime,
      prezime: prezime,
      spec: spec,
      ogranak: ogranak
    }

    return this.http.post(`${this.uri}/dohvatiLekare`, data)
  }

  zakaziPregled(pacijent: string, lekar: string, naziv: string, datum_vreme: Date, ogranak: string, trajanje: number, spec: string){
    let data = {
      pacijent: pacijent,
      lekar: lekar,
      naziv: naziv,
      datum_vreme: datum_vreme,
      ogranak: ogranak,
      trajanje: trajanje,
      otkazan: false,
      obav: false,
      spec: spec
    }

    return this.http.post(`${this.uri}/zakaziPregled`, data)
  }

  dohvatiPreglede(pacijent: string) {
    let data = {
      pacijent: pacijent
    }

    return this.http.post(`${this.uri}/dohvatiPreglede`, data)
  }


  otkaziPregled(id: number) {
    let data = {
      id: id
    }

    return this.http.post(`${this.uri}/otkaziPregled`, data)
  }
  
  dohvatiObavestenja(korisnickoIme: string){
    let data = {
      korisnik: korisnickoIme
    }

    return this.http.post(`${this.uri}/dohvatiObavestenja`, data)

  }

  automatskiPodsetnik(korisnickoIme: string){
    let data = {
      pacijent: korisnickoIme
    }

    return this.http.post(`${this.uri}/automatskiPodsetnik`, data)

  }
}