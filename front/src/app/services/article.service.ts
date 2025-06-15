import { inject, Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  delay,
  lastValueFrom,
  catchError,
  switchMap,
  timer,
  Observable,
  of,
  tap,
  map,
} from 'rxjs';

const url = environment.apiDomain + '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined;
  errorMsg = '';
  http = inject(HttpClient);

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
        this.errorMsg = '';
      }),
      switchMap(() => this.http.get<Article[]>(url)),
      delay(200),
      map((articles) => {
        console.log('articles: ', articles);
        this.articles = articles;
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Technical Error';
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
