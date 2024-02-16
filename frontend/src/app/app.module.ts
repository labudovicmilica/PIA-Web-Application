import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
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
import { NelegalnoComponent } from './nelegalno/nelegalno.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NeregistrovaniComponent,
    RegistracijaComponent,
    PretragaLekaraComponent,
    LoginMenadzerComponent,
    PacijentComponent,
    PromenaLozinkeComponent,
    PregledLekaraPacijentComponent,
    PrikazProfilaLekaraComponent,
    PacijentZakazivanjeComponent,
    LekarComponent,
    PacijentPreglediComponent,
    LekarPreglediComponent,
    LekarRaznoComponent,
    LekarKartonComponent,
    MenadzerComponent,
    MenadzerRegistracijaComponent,
    MenadzerKorisniciComponent,
    MenadzerAzuzriranjeKorisnikaComponent,
    MenadzerDodajLekaraComponent,
    MenadzerSpecijalizacijaComponent,
    MenadzerPromocijeComponent,
    PacijentObavestenjaComponent,
    NePostojiComponent,
    NelegalnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
