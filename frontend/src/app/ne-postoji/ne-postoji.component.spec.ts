import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NePostojiComponent } from './ne-postoji.component';

describe('NePostojiComponent', () => {
  let component: NePostojiComponent;
  let fixture: ComponentFixture<NePostojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NePostojiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NePostojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
