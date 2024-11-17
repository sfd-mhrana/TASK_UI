import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartkedInformationComponent } from './partked-information.component';

describe('PartkedInformationComponent', () => {
  let component: PartkedInformationComponent;
  let fixture: ComponentFixture<PartkedInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartkedInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartkedInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
