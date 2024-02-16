import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PretragaLekaraComponent } from './pretraga-lekara/pretraga-lekara.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PregledLekaraPacijentComponent } from './pregled-lekara-pacijent/pregled-lekara-pacijent.component';
import { PrikazProfilaLekaraComponent } from './prikaz-profila-lekara/prikaz-profila-lekara.component';
import { PacijentZakazivanjeComponent } from './pacijent-zakazivanje/pacijent-zakazivanje.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentPreglediComponent } from './pacijent-pregledi/pacijent-pregledi.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component';
import { LekarRaznoComponent } from './lekar-razno/lekar-razno.component';
import { LekarKartonComponent } from './lekar-karton/lekar-karton.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerRegistracijaComponent } from './menadzer-registracija/menadzer-registracija.component';
import { MenadzerKorisniciComponent } from './menadzer-korisnici/menadzer-korisnici.component';
import { MenadzerAzuzriranjeKorisnikaComponent } from './menadzer-azuzriranje-korisnika/menadzer-azuzriranje-korisnika.component';
import { MenadzerDodajLekaraComponent } from './menadzer-dodaj-lekara/menadzer-dodaj-lekara.component';
import { MenadzerSpecijalizacijaComponent } from './menadzer-specijalizacija/menadzer-specijalizacija.component';
import { MenadzerPromocijeComponent } from './menadzer-promocije/menadzer-promocije.component';
import { PacijentObavestenjaComponent } from './pacijent-obavestenja/pacijent-obavestenja.component';
import { NePostojiComponent } from './ne-postoji/ne-postoji.component';
import { AuthGuard } from './auth.guard';
import { NelegalnoComponent } from './nelegalno/nelegalno.component';

const routes: Routes = [
  {path:'', component: NeregistrovaniComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'pretraga-lekara', component: PretragaLekaraComponent},
  {path: 'login-menadzer', component: LoginMenadzerComponent},
  {path: 'pacijent', component: PacijentComponent, canActivate:[AuthGuard], data:{"uloga": "pacijent"}},
  {path: 'promena-lozinke', component: PromenaLozinkeComponent, canActivate:[AuthGuard], data:{"uloga": "svi"}},
  {path: 'pacijent/lekari', component: PregledLekaraPacijentComponent, canActivate:[AuthGuard], data:{"uloga": "pacijent"}},
  {path: 'pacijent/lekari/prikaz', component: PrikazProfilaLekaraComponent, canActivate:[AuthGuard], data:{"uloga": "pacijent"}},
  {path: 'pacijent/lekari/zakazivanje', component: PacijentZakazivanjeComponent, canActivate:[AuthGuard], data:{"uloga": "pacijent"}},
  {path: 'lekar', component: LekarComponent, canActivate:[AuthGuard], data:{"uloga": "lekar"}},
  {path: 'pacijent/pregledi', component: PacijentPreglediComponent, canActivate:[AuthGuard], data:{"uloga": "pacijent"}},
  {path: 'lekar/pregledi', component: LekarPreglediComponent, canActivate:[AuthGuard], data:{"uloga": "lekar"}},
  {path: 'lekar/razno', component: LekarRaznoComponent, canActivate:[AuthGuard], data:{"uloga": "lekar"}},
  {path: 'lekar/pregledi/karton', component: LekarKartonComponent, canActivate:[AuthGuard], data:{"uloga": "lekar"}},
  {path: 'menadzer', component: MenadzerComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'menadzer/registracija', component: MenadzerRegistracijaComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'menadzer/korisnici', component: MenadzerKorisniciComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'menadzer/korisnici/azuriranje', component: MenadzerAzuzriranjeKorisnikaComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'menadzer/korisnici/dodaj-lekara', component: MenadzerDodajLekaraComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'menadzer/specijalizacije', component: MenadzerSpecijalizacijaComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'menadzer/promocije', component: MenadzerPromocijeComponent, canActivate:[AuthGuard], data:{"uloga": "menadzer"}},
  {path: 'pacijent/obavestenja', component: PacijentObavestenjaComponent, canActivate:[AuthGuard], data:{"uloga": "pacijent"}},
  {path: 'nelegalno', component: NelegalnoComponent},
  {path: '**', component: NePostojiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
