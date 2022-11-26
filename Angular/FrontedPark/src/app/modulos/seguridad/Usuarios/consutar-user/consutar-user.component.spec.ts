import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsutarUserComponent } from './consutar-user.component';

describe('ConsutarUserComponent', () => {
  let component: ConsutarUserComponent;
  let fixture: ComponentFixture<ConsutarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsutarUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsutarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
