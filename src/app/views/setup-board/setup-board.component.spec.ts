import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBoardComponent } from './setup-board.component';

describe('SetupBoardComponent', () => {
  let component: SetupBoardComponent;
  let fixture: ComponentFixture<SetupBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
