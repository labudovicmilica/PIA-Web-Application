import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-pretraga-lekara',
  templateUrl: './pretraga-lekara.component.html',
  styleUrls: ['./pretraga-lekara.component.css']
})
export class PretragaLekaraComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  lekari: User[];

  ime: string = "";
  prezime: string = "";
  spec: string = "";

  ngOnInit(): void {
    this.userService.dohvatiLekare("", "", "").subscribe((users: User[])=>{
      this.lekari = users;
    })

  }

  pretraga() {
    this.userService.dohvatiLekare(this.ime, this.prezime, this.spec).subscribe((users: User[])=>{
      this.lekari = users;
    })
  }

  sortirajIme(flag: boolean){

    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.ime, b.ime))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.ime, a.ime))
    }
  }

  mojSort(a: string, b: string){
    if(a>b) return 1;
    else if(b>a) return -1;
    else return 0;
  }

  sortirajPrezime(flag: boolean){
    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.prezime, b.prezime))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.prezime, a.prezime))
    }
  }

  sortirajSpec(flag: boolean){
    if(flag == true){
      this.lekari.sort((a,b)=> this.mojSort(a.spec.toLowerCase(), b.spec.toLowerCase()))
    }
    else{
      this.lekari.sort((a,b)=> this.mojSort(b.spec.toLowerCase(), a.spec.toLowerCase()))
    }
  }

}
