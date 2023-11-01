import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDatailComponent } from './record-datail.component';

describe('RecordDatailComponent', () => {
  let component: RecordDatailComponent;
  let fixture: ComponentFixture<RecordDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordDatailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
