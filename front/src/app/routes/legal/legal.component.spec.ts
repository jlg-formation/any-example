import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalComponent } from './legal.component';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('LegalComponent', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter(routes),
      ],
      imports: [LegalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
