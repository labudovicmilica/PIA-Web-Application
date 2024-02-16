import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PacijentService } from '../services/pacijent.service';
import { User } from '../models/user';
import { Pregled } from '../models/pregledi';

@Component({
  selector: 'app-prikaz-profila-lekara',
  templateUrl: './prikaz-profila-lekara.component.html',
  styleUrls: ['./prikaz-profila-lekara.component.css']
})
export class PrikazProfilaLekaraComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private pacijentService: PacijentService) { }

  korisnik: User;
  lekar: User;
  pregl: string[];
  pregledi: Pregled[];

  ngOnInit() {
    let ulogovan = sessionStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    })
    let dr = sessionStorage.getItem("lekar");
    let pre = [] as Pregled[];
    this.userService.getUser(dr).subscribe((k: User)=>{
      this.lekar = k;
      this.pregl = this.lekar.pregledi;
      
      this.pregl.forEach(pr => {
        this.userService.dohvatiPregled(pr, this.lekar.spec).subscribe((res: Pregled)=>{
          pre.push(res);
        }); 
    });
    this.pregledi = pre;
    })
  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

  nazad(){
    sessionStorage.removeItem("lekar");
    this.router.navigate(['pacijent/lekari']);
  }

  zakazi(pregled: string){
    sessionStorage.setItem("pregled", pregled);
    //sessionStorage.setItem("lekar", this.lekar.korisnickoIme);

    this.router.navigate(['pacijent/lekari/zakazivanje']);
  }

}
