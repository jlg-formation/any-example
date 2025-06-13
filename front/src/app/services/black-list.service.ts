import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlackListService {
  constructor(private httpClient: HttpClient) {}
  isBlackListed(value: string): Observable<boolean> {
    return of(undefined).pipe(
      tap(() => {
        console.log('about to send blackList test');
      }),
      switchMap(() =>
        this.httpClient.get<boolean>(`/api/isBlackListed?word=${value}`),
      ),
    );
  }
  blackList = ['zut', 'mince', 'crotte'];
}
