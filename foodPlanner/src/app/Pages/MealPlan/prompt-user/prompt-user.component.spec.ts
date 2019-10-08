import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptUserComponent } from './prompt-user.component';

describe('PromptUserComponent', () => {
  let component: PromptUserComponent;
  let fixture: ComponentFixture<PromptUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
