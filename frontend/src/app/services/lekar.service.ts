import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZakazanPregled } from '../models/zakazani_pregledi';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/lekar'

  izmeni(ime: string, prezime: string, korisnickoIme: string, lozinka: string, mejl: string, adresa: string, telefon: string, ime_slike: string, tip: string, pregledi: Array<String>, licenca: string, spec: string, ogranak: string) {
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
      licenca: licenca,
      spec: spec,
      ogranak: ogranak,
      status: "odobren",
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

  dohvatiPreglede(spec: string){
    let data = {
      spec: spec
    }

    return this.http.post(`${this.uri}/dohvatiPreglede`, data)
  }

  izmeniPreglede(pregledi: string[], korisnickoIme: string){
    let data = {
      pregledi: pregledi,
      korisnickoIme: korisnickoIme
    }

    return this.http.post(`${this.uri}/izmeniPreglede`, data)
  }

  otkaziPregled(id: number, obrazlozenje: string) {
    let data = {
      id: id,
      obrazlozenje: obrazlozenje
    }

    return this.http.post(`${this.uri}/otkaziPregled`, data)
  }

  dohvatiPredstojecePreglede(lekar: string){
    let data = {
      lekar: lekar
    }
    return this.http.post(`${this.uri}/dohvatiPredstojecePreglede`, data)
  }

  predloziPregled(naziv: string, spec: string){
    let data = {
      naziv: naziv,
      spec: spec
    }

    return this.http.post(`${this.uri}/predloziPregled`, data)
  }

  unesiIzvestaj(id: number, lekar: string, spec: string, pacijent: string, razlog: string, dijagnoza: string, terapija: string, kontrola: Date){

    let data = {
      idPregleda: id,
      lekar: lekar,
      spec: spec,
      pacijent: pacijent,
      razlogDolaska: razlog,
      dijagnoza: dijagnoza,
      terapija: terapija,
      kontrola: kontrola
    }

    return this.http.post(`${this.uri}/unesiIzvestaj`, data)

  }

  slobodanDan(datum: Date, lekar: string, razlog: string){
    let data = {
      datum: datum,
      lekar: lekar,
      razlog: razlog
    }


    return this.http.post(`${this.uri}/slobodanDan`, data)

  }
  


  
}
