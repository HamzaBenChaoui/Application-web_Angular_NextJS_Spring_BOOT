import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularComponent } from './fomular.component';

describe('FomularComponent', () => {
  let component: FomularComponent;
  let fixture: ComponentFixture<FomularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FomularComponent]
    });
    fixture = TestBed.createComponent(FomularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
