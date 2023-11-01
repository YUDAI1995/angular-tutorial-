import { ComponentFixture, TestBed } from '@angular/core/testing';

import { recordComponent } from './record.component';

describe('recordComponent', () => {
  let component: recordComponent;
  let fixture: ComponentFixture<recordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [recordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(recordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
