import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { PacijentService } from '../services/pacijent.service';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private pacijentService: PacijentService) { }

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

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");

    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
  }

  
  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }


   mejlic: string = "";
  azuriraj() {
    this.mejlic = this.korisnik.mejl;
    this.flag = !this.flag;
  }

  promeniLozinku(){
    this.router.navigate(['promena-lozinke']);
  }

  erroric: string = "";
  gr: boolean = false;
  izmeni(){
    this.erroric = "";
    if(this.mejlic != this.korisnik.mejl){
      if(!this.korisnik.mejl.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
        this.erroric += "I-mejl adresa nije u dobrom formatu.\n";
        this.gr = true;
        return;
      } else{
        this.userService.checkMejl(this.korisnik.mejl).subscribe((l: User)=>{
          if(l) {
            this.erroric += "Već postoji nalog za uneseni i-mejl.\n";
            this.gr = true;
            return;
          }else {
            if(this.gr === false){
              this.flag = !this.flag;
              this.pacijentService.izmeni(this.korisnik.ime, this.korisnik.prezime, this.korisnik.korisnickoIme, this.korisnik.lozinka, this.korisnik.mejl, this.korisnik.adresa, this.korisnik.telefon, this.korisnik.slika, this.korisnik.tip, this.korisnik.pregledi).subscribe((res)=>{
                this.ngOnInit();
              })
            }
          }
        })
      }
    } else{
      this.flag = !this.flag;
      this.pacijentService.izmeni(this.korisnik.ime, this.korisnik.prezime, this.korisnik.korisnickoIme, this.korisnik.lozinka, this.korisnik.mejl, this.korisnik.adresa, this.korisnik.telefon, this.korisnik.slika, this.korisnik.tip, this.korisnik.pregledi).subscribe((res)=>{
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
          this.pacijentService.promeniSliku(this.korisnik.korisnickoIme, this.ime_slike).subscribe((resp)=>{
            
          });
          this.ngOnInit();
          this.flag2 = false;
          return;
        }
      });
    }

 }


}
