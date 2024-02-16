import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenadzerService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/menadzer'

  dohvatiZahteveZaRegistraciju(){
    let data = {
      bla: 0
    }

    return this.http.post(`${this.uri}/dohvatiZahteveZaRegistraciju`, data)

    
  }

  odgovorNaZahtev(korisnickoIme: string, flag: boolean){
    let data = {
      korisnickoIme: korisnickoIme,
      flag: flag
    }

    return this.http.post(`${this.uri}/odgovorNaZahtev`, data)

  }

  dohvatiSve(){
    let data = {
      bla: 0
    }

    return this.http.post(`${this.uri}/dohvatiSve`, data)
  }

  obrisi(korisnickoIme: string){
    let data = {
      korisnickoIme: korisnickoIme
    }

    return this.http.post(`${this.uri}/obrisiKorisnika`, data)

  }

  izmeni(ime: string, prezime: string, korisnickoIme: string, lozinka: string, mejl: string, adresa: string, telefon: string, ime_slike: string, tip: string, pregledi: Array<String>, spec: string, ogranak: string, licenca: string) {
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

    return this.http.post(`${this.uri}/izmeniKorisnika`, data)
  }


  addUser(ime: string, prezime: string, korisnickoIme: string, lozinka: string, mejl: string, adresa: string, telefon: string, ime_slike: string, spec: string, ogranak: string, licenca:string) {
    let data = {
      ime: ime,
      prezime: prezime,
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      mejl: mejl,
      telefon: telefon,
      adresa: adresa,
      slika: ime_slike,
      spec: spec,
      ogranak: ogranak,
      licenca: licenca

    }

    return this.http.post(`${this.uri}/addUser`, data)
  }

  dodajSpec(spec: string){
    let data = {
      naziv: spec
    }

    return this.http.post(`${this.uri}/dodajSpec`, data)

  }

  dohvatiSveSpec(){
    let data = {
      blah: 0
    }

    return this.http.post(`${this.uri}/dohvatiSveSpec`, data)

  }

  onemoguciPregled(naziv: string, spec: string){
    let data = {
      naziv: naziv,
      spec: spec
    }

    return this.http.post(`${this.uri}/onemoguciPregled`, data)

  }

  azurirajPregled(naziv: string, spec: string, trajanje: number, cena: number, staraCena: number){
    let data = {
      naziv: naziv,
      spec: spec,
      trajanje: trajanje,
      cena: cena,
      staraCena: staraCena
    }

    return this.http.post(`${this.uri}/azurirajPregled`, data)

  }

  dodajPregled(spec: string, naziv: string, cena: number, trajanje: number){
    let data = {
      naziv: naziv,
      spec: spec,
      trajanje: trajanje,
      cena: cena,
      omogucen: true
    }

    return this.http.post(`${this.uri}/dodajPregled`, data)

  }

  zahteviZaPreglede(){
    let data = {
      blah: 0
    }

    return this.http.post(`${this.uri}/zahteviZaPreglede`, data)

  }

  odbijPregled(spec: string, naziv: string){
    let data = {
      naziv: naziv,
      spec: spec
    }

    return this.http.post(`${this.uri}/odbijPregled`, data)

  }


  dodajAkciju(tekst: string){
    let data = {
      akcija: tekst
    }

    return this.http.post(`${this.uri}/dodajAkciju`, data)

  }

  

}

