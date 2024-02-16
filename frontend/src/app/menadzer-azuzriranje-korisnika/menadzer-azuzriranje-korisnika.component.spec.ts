import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerAzuzriranjeKorisnikaComponent } from './menadzer-azuzriranje-korisnika.component';

describe('MenadzerAzuzriranjeKorisnikaComponent', () => {
  let component: MenadzerAzuzriranjeKorisnikaComponent;
  let fixture: ComponentFixture<MenadzerAzuzriranjeKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerAzuzriranjeKorisnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerAzuzriranjeKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
