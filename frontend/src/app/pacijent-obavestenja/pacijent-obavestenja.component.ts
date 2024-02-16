import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { PacijentService } from '../services/pacijent.service';
import { User } from '../models/user';
import { Obavestenje } from '../models/obavestenja';

@Component({
  selector: 'app-pacijent-obavestenja',
  templateUrl: './pacijent-obavestenja.component.html',
  styleUrls: ['./pacijent-obavestenja.component.css']
})
export class PacijentObavestenjaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private pacijentService: PacijentService) { }

  korisnik: User;
  obavestenja: Obavestenje[];
  ngOnInit(): void {
    let ulogovan = sessionStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((k: User)=>{
      this.korisnik = k;
    });
    this.pacijentService.automatskiPodsetnik(ulogovan).subscribe((ress)=>{
      this.pacijentService.dohvatiObavestenja(ulogovan).subscribe((resp: Obavestenje[])=>{
        this.obavestenja = resp;
      })
    })


  }

  odjaviSe() {
    sessionStorage.removeItem("ulogovan");
    this.router.navigate(['']);
  }

}
