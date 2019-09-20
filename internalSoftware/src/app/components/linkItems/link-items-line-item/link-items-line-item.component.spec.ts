import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkItemsLineItemComponent } from './link-items-line-item.component';

describe('LinkItemsLineItemComponent', () => {
  let component: LinkItemsLineItemComponent;
  let fixture: ComponentFixture<LinkItemsLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkItemsLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkItemsLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
