import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyKeysComponent } from './my-keys.component';

describe('MyKeysComponent', () => {
  let component: MyKeysComponent;
  let fixture: ComponentFixture<MyKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
