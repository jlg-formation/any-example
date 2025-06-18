import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Observable, catchError, finalize, of, switchMap, tap } from 'rxjs';

import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [FontAwesomeModule, RouterLink],
})
export default class ListComponent implements OnInit {
  protected readonly articleService = inject(ArticleService);

  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  ngOnInit(): void {
    if (this.articleService.articles() === undefined) {
      this.articleService.load().subscribe();
    }
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        this.isRefreshing = true;
        return this.articleService.load();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Rechargement impossible';
        return of(undefined);
      }),
      finalize(() => {
        this.isRefreshing = false;
      }),
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        this.isRemoving = true;
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => this.articleService.load()),
      tap(() => this.selectedArticles.clear()),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Cannot suppress';
        return of(undefined);
      }),
      finalize(() => {
        this.isRemoving = false;
      }),
    );
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
