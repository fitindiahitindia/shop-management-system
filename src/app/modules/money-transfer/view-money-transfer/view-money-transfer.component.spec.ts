import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoneyTransferComponent } from './view-money-transfer.component';

describe('ViewMoneyTransferComponent', () => {
  let component: ViewMoneyTransferComponent;
  let fixture: ComponentFixture<ViewMoneyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoneyTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
