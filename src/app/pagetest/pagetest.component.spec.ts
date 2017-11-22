import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagetestComponent } from './pagetest.component';

describe('PagetestComponent', () => {
  let component: PagetestComponent;
  let fixture: ComponentFixture<PagetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
