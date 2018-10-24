import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorSearchComponent } from './warrior-search.component';

describe('WarriorSearchComponent', () => {
  let component: WarriorSearchComponent;
  let fixture: ComponentFixture<WarriorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarriorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarriorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
