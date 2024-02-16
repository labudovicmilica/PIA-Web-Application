import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  image = null;

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  ime: string = "";
  prezime: string = "";
  mejl: string = "";
  korisnickoIme: string = "";
  lozinka: string = "";
  plozinka: string = "";
  adresa: string = "";
  telefon: string = "";
  error: string = "";
  velicina: boolean = false;
  ekstenzija: boolean = false;
  ime_slike: string = "";
  load: boolean = false;
  counter: number = 0;
  choosen: boolean = false;

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



   async zahtev() {
    if (this.ime == "" || this.prezime == "" || this.mejl == "" || this.korisnickoIme == "" || this.lozinka == "" || this.plozinka == "" || this.adresa == "" || this.telefon == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";

    this.userService.getUser(this.korisnickoIme).subscribe((k: User)=>{
      if(k) {
        this.error += "Korisničko ime nije dostupno.\n";
      }
      
    })

    if(!this.mejl.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
      this.error += "I-mejl adresa nije u dobrom formatu.\n";
    } else{
      this.userService.checkMejl(this.mejl).subscribe((l: User)=>{
        if(l) {
          this.error += "Već postoji nalog za uneseni i-mejl.\n";
        }
      })
    }
    if(!this.lozinka.match(/^(?!.*(\w)\1)(?=[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,14}$/
    )){
      this.error += "Lozinka ne odgovara zadatom paternu.\n";
    }else{
      if(this.lozinka != this.plozinka){
        this.error += "Lozinke se ne slažu.\n";
      }
  
    }
    
   
    if(!this.telefon.match(/^[0-9]{6,10}$/)){
      this.error += "Telefon mora imati od 6 do 10 cifara.\n";
    }
    let k = 0;

    await this.loader();

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
          this.userService.addUser(this.ime, this.prezime, this.korisnickoIme, this.lozinka, this.mejl, this.adresa, this.telefon, this.ime_slike).subscribe((res)=>{
            if(res['message'] != 'ok'){
              alert("nonono")
            }
          })
          this.router.navigate(['']);
        }
      });
    }
    
    if(this.error == "" && !this.choosen) {
      this.userService.addUser(this.ime, this.prezime, this.korisnickoIme, this.lozinka, this.mejl, this.adresa, this.telefon, "korisnik_default.png").subscribe((res)=>{
        if(res['message'] != 'ok'){
          alert("nonono")
        }
      })
      this.router.navigate(['']);
      
    }
  }

}
