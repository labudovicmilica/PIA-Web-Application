import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NelegalnoComponent } from './nelegalno.component';

describe('NelegalnoComponent', () => {
  let component: NelegalnoComponent;
  let fixture: ComponentFixture<NelegalnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NelegalnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NelegalnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
