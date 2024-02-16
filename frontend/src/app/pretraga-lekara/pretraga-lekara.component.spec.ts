import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaLekaraComponent } from './pretraga-lekara.component';

describe('PretragaLekaraComponent', () => {
  let component: PretragaLekaraComponent;
  let fixture: ComponentFixture<PretragaLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretragaLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PretragaLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
