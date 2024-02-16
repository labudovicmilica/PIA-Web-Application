import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  korisnik: User;
  novaLozinka: string = "";
  novaLozinkaPonovo : string = "";
  staraLozinka : string = "";
  error: string = "";

  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");


    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
  }

  odustani(){
    this.router.navigate([this.korisnik.tip])
  }

  promeni(){
    this.error = "";
    if(this.staraLozinka != this.korisnik.lozinka) {
      this.error = "Stara lozinka se ne podudara."
      return;
    }

    if(!this.novaLozinka.match(/^(?!.*(\w)\1)(?=[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,14}$/
    )){
      this.error += "Nova lozinka ne odgovara zadatom formatu.\n";
      return;
    }else{
      if(this.novaLozinka != this.novaLozinkaPonovo){
        this.error += "Lozinke se ne slažu.\n";
        return;
      }
    }
    if(this.error == "") {
      this.userService.promeniLozinku(this.korisnik.korisnickoIme, this.novaLozinka).subscribe((res)=>{
      })
              this.router.navigate(['login']);

    }
  }
}
