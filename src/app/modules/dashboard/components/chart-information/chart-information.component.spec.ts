import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInformationComponent } from './chart-information.component';

describe('ChartInformationComponent', () => {
  let component: ChartInformationComponent;
  let fixture: ComponentFixture<ChartInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
