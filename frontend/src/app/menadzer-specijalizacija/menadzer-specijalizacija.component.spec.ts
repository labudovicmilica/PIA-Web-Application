import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerSpecijalizacijaComponent } from './menadzer-specijalizacija.component';

describe('MenadzerSpecijalizacijaComponent', () => {
  let component: MenadzerSpecijalizacijaComponent;
  let fixture: ComponentFixture<MenadzerSpecijalizacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerSpecijalizacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerSpecijalizacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
