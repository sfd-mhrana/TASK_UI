import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingInformationComponent } from './create-parking-information.component';

describe('CreateParkingInformationComponent', () => {
  let component: CreateParkingInformationComponent;
  let fixture: ComponentFixture<CreateParkingInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateParkingInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateParkingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
