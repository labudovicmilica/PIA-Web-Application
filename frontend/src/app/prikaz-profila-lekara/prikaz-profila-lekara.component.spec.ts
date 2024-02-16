import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazProfilaLekaraComponent } from './prikaz-profila-lekara.component';

describe('PrikazProfilaLekaraComponent', () => {
  let component: PrikazProfilaLekaraComponent;
  let fixture: ComponentFixture<PrikazProfilaLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazProfilaLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazProfilaLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
