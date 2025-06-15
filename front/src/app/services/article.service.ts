import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewArticle } from '../interfaces/article';

const url = environment.apiDomain + '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles = signal<Article[] | undefined>(undefined);
  errorMsg = signal('');
  http = inject(HttpClient);

  constructor() {
    if (this.articles() === undefined) {
      this.load().subscribe();
    }
  }

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle)),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      }),
    );
  }

  load(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        console.log('start load');
        this.errorMsg.set('');
      }),
      switchMap(() => this.http.get<Article[]>(url)),
      delay(200),
      map((articles) => {
        console.log('articles: ', articles);
        this.articles.set(articles);
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg.set('Technical Error');
        throw err;
      }),
    );
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(200),
      switchMap(() =>
        this.http.delete<void>(url, {
          body: ids,
        }),
      ),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      }),
    );
  }
}
