import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neregistrovani',
  templateUrl: './neregistrovani.component.html',
  styleUrls: ['./neregistrovani.component.css']
})
export class NeregistrovaniComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit(): void {
  }

  prijava(){
    this.router.navigate(['login']);
  }

  registracija(){
    this.router.navigate(['registracija']);
  }

  pretraga(){
    this.router.navigate(['pretraga-lekara']);
  }

}
