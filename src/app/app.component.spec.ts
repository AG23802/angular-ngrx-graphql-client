import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  const storeMock = {
    select: jasmine.createSpy().and.returnValue(of('angular-graphql-jwt-demo')),
    dispatch: jasmine.createSpy(),
  };

  let httpClient: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: HttpClient, useValue: httpClient },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
