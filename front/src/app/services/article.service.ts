import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  lastValueFrom,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewArticle } from '../interfaces/article';

const url = environment.apiDomain + '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[] | undefined>(undefined);
  errorMsg = '';

  constructor(private http: HttpClient) {
    console.log('instantiate articleservice');
  }

  async add(newArticle: NewArticle) {
    await lastValueFrom(
      this.http.post<void>(url, newArticle).pipe(
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
  }

  async load(): Promise<void> {
    try {
      this.errorMsg = '';
      await this.http
        .get<Article[]>(url)
        .pipe(delay(1000))
        .forEach((articles) => {
          this.articles$.next(articles);
        });
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Technical Error';
      this.articles$.next(undefined);
    }
  }

  loadObs(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.errorMsg = '';
      }),
      switchMap(() => {
        return this.http.get<Article[]>(url);
      }),
      delay(300),
      map((articles) => {
        this.articles$.next(articles);
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Technical Error';
        this.articles$.next(undefined);
        return of(undefined);
      })
    );
  }

  async remove(ids: string[]) {
    await lastValueFrom(
      timer(1000).pipe(
        switchMap(() =>
          this.http.delete<void>(url, {
            body: ids,
          })
        ),
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
  }
}
