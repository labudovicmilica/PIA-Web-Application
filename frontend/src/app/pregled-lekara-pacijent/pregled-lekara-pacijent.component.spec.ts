import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledLekaraPacijentComponent } from './pregled-lekara-pacijent.component';

describe('PregledLekaraPacijentComponent', () => {
  let component: PregledLekaraPacijentComponent;
  let fixture: ComponentFixture<PregledLekaraPacijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledLekaraPacijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledLekaraPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
