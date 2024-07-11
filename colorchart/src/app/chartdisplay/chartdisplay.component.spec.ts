import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdisplayComponent } from './chartdisplay.component';

describe('ChartdisplayComponent', () => {
  let component: ChartdisplayComponent;
  let fixture: ComponentFixture<ChartdisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartdisplayComponent]
    });
    fixture = TestBed.createComponent(ChartdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
