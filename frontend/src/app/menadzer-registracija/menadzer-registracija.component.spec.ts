import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerRegistracijaComponent } from './menadzer-registracija.component';

describe('MenadzerRegistracijaComponent', () => {
  let component: MenadzerRegistracijaComponent;
  let fixture: ComponentFixture<MenadzerRegistracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerRegistracijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
