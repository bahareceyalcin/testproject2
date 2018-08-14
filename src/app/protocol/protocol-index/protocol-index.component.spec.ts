import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolIndexComponent } from './protocol-index.component';

describe('ProtocolIndexComponent', () => {
  let component: ProtocolIndexComponent;
  let fixture: ComponentFixture<ProtocolIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
