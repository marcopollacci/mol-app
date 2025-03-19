import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOperationsComponent } from './home-operations.component';

describe('HomeOperationsComponent', () => {
  let component: HomeOperationsComponent;
  let fixture: ComponentFixture<HomeOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
