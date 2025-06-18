import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncBtnComponent } from './async-btn.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AsyncBtnComponent', () => {
  let component: AsyncBtnComponent;
  let fixture: ComponentFixture<AsyncBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [AsyncBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
