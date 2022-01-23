import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDatailComponent } from './member-datail.component';

describe('MemberDatailComponent', () => {
  let component: MemberDatailComponent;
  let fixture: ComponentFixture<MemberDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
