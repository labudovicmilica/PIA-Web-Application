import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/user'
 
  login(username: string, password: string) {
    let data = {
      username: username, password: password
    }
    return this.http.post(`${this.uri}/login`, data)
  }

  getUser(username: string) {
    let data = {
      username: username
    }
    return this.http.post(`${this.uri}/getUser`, data)
  }

  checkMejl(mejl: string) {
    let data = {
      mejl: mejl
    }
    return this.http.post(`${this.uri}/checkMejl`, data)
  }

  addUser(ime: string, prezime: string, korisnickoIme: string, lozinka: string, mejl: string, adresa: string, telefon: string, ime_slike: string) {
    let data = {
      ime: ime,
      prezime: prezime,
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      mejl: mejl,
      telefon: telefon,
      adresa: adresa,
      slika: ime_slike
    }

    return this.http.post(`${this.uri}/addUser`, data)
  }


  dohvatiLekare(ime: string, prezime: string, spec: string) {
    let data = {
      ime: ime,
      prezime: prezime,
      spec: spec
    }

    return this.http.post(`${this.uri}/dohvatiLekare`, data)
  }

  promeniLozinku(korisnickoIme: string, lozinka: string){
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/promeniLozinku`, data)
  }
  
  dohvatiPregled(naziv: string, spec: string){
    let data = {
      naziv: naziv,
      spec: spec
    }

    return this.http.post(`${this.uri}/dohvatiPregled`, data)
  }

  dohvatiIzvestajeZaPacijenta(pacijent: string){
    let data = {
      pacijent: pacijent
    }

    return this.http.post(`${this.uri}/dohvatiIzvestajeZaPacijenta`, data)

  }


  dohvatiIzvestajeZaLekara(pacijent: string){
    let data = {
      lekar: pacijent
    }

    return this.http.post(`${this.uri}/dohvatiIzvestajeZaLekara`, data)

  }
}
