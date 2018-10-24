import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorDetailComponent } from './warrior-detail.component';

describe('WarriorDetailComponent', () => {
  let component: WarriorDetailComponent;
  let fixture: ComponentFixture<WarriorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarriorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarriorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
