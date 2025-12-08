import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMoneyTransferComponent } from './view-all-money-transfer.component';

describe('ViewAllMoneyTransferComponent', () => {
  let component: ViewAllMoneyTransferComponent;
  let fixture: ComponentFixture<ViewAllMoneyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllMoneyTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllMoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
