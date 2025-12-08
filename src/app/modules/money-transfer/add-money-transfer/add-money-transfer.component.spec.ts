import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyTransferComponent } from './add-money-transfer.component';

describe('AddMoneyTransferComponent', () => {
  let component: AddMoneyTransferComponent;
  let fixture: ComponentFixture<AddMoneyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
