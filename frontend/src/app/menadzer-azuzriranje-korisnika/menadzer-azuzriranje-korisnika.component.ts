import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { PacijentService } from '../services/pacijent.service';
import { MenadzerService } from '../services/menadzer.service';

@Component({
  selector: 'app-menadzer-azuzriranje-korisnika',
  templateUrl: './menadzer-azuzriranje-korisnika.component.html',
  styleUrls: ['./menadzer-azuzriranje-korisnika.component.css']
})
export class MenadzerAzuzriranjeKorisnikaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private pacijentService: PacijentService, private menadzerService: MenadzerService) { }

  korisnik: User;
  flag: boolean = true;
  flag2: boolean = false;
  error: string = "";
  velicina: boolean = false;
  ekstenzija: boolean = false;
  ime_slike: string = "";
  load: boolean = false;
  choosen: boolean = false;
  image;
  klijent: User;
  flagic: boolean = true;
  mejlic: string = "";

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
    let kl = sessionStorage.getItem("klijent");

    this.userService.getUser(kl).subscribe((k: User)=>{
      this.klijent = k;
      if(this.klijent.tip === 'pacijent') this.flagic = false;
      this.mejlic = this.klijent.mejl;
    })
  }

  
  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }


  erroric: string = "";
  gr: boolean = false;

  izmeni(){
    this.erroric = "";
    if(this.mejlic != this.klijent.mejl){
      if(!this.klijent.mejl.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
        this.erroric += "I-mejl adresa nije u dobrom formatu.\n";
        this.gr = true;
        return;
      } else{
        this.userService.checkMejl(this.klijent.mejl).subscribe((l: User)=>{
          if(l) {
            this.erroric += "Već postoji nalog za uneseni i-mejl.\n";
            this.gr = true;
            return;
          }else {
            if(this.gr === false){
              this.menadzerService.izmeni(this.klijent.ime, this.klijent.prezime, this.klijent.korisnickoIme, this.klijent.lozinka, this.klijent.mejl, this.klijent.adresa, this.klijent.telefon, this.klijent.slika, this.klijent.tip, this.klijent.pregledi, this.klijent.spec, this.klijent.ogranak, this.klijent.licenca).subscribe((res)=>{
                this.ngOnInit();
              })
            }
          }
        })
      }
    } else{
      this.menadzerService.izmeni(this.klijent.ime, this.klijent.prezime, this.klijent.korisnickoIme, this.klijent.lozinka, this.klijent.mejl, this.klijent.adresa, this.klijent.telefon, this.klijent.slika, this.klijent.tip, this.klijent.pregledi, this.klijent.spec, this.klijent.ogranak, this.klijent.licenca).subscribe((res)=>{
        this.ngOnInit();
      })
    }

  }

  async fileChoosen(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.choosen = true;
      const file = event.target.files[0];
      this.image = file;

      this.ime_slike = file.originalname;
      //console.log(this.ime_slike);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.height;
          const width = img.width;

          if(height<100 || height>300 || width<100 || height>300){
            this.velicina = true;
            event.target.value = '';
            this.choosen = false;
          } else{
            this.velicina = false;
          }
          //this.ime_slike = file.filename;
          if(!(file.filename.substring(file.filename.lastIndexOf(".")) === 'png' || file.filename.substring(file.filename.lastIndexOf(".")) === 'jpg' && file.filename.substring(file.filename.lastIndexOf(".")) === 'jpeg')) {
            this.ekstenzija = true;
            event.target.value = '';
            this.choosen = false
          }
          else{
            this.ekstenzija = false;
          }
        };
      };


    }

    this.load = true;
  }
 async loader() {
  if(this.choosen){
    while (!this.load){
    }
  }
 }

 promenaSlike(){
  this.flag2 = !this.flag2;
 }

 async promeni(){
  this.error = "";
  await this.loader();
  if(!this.choosen) {
    this.error = "Slika nije izabrana."
    return;
  }

    if(this.ekstenzija == true && this.choosen) {
      this.error += "Slika moze biti samo formata .png ili .jpg. \n";
    }

    if(this.velicina == true && this.choosen){
      this.error += "Slika mora biti velicine od 100x100 do 300x300. \n";
    }
    if(!this.velicina && !this.ekstenzija && this.error == "" && this.choosen){
      const formData = new FormData();
      formData.append('file', this.image);

      await this.http.post<any>('http://localhost:3000/file', formData).subscribe((res)=>{
        if(res){
          this.ime_slike = res["filename"];
          this.pacijentService.promeniSliku(this.klijent.korisnickoIme, this.ime_slike).subscribe((resp)=>{
            
          });
          this.ngOnInit();
          this.flag2 = false;
          return;
        }
      });
    }

 }

}
