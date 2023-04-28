import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskPopupComponent } from './create-task-popup.component';

describe('CreateTaskPopupComponent', () => {
  let component: CreateTaskPopupComponent;
  let fixture: ComponentFixture<CreateTaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
