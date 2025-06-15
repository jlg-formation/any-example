import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [RouterLink, FontAwesomeModule, AsyncBtnComponent],
})
export default class ListComponent {
  readonly articleService = inject(ArticleService);
  readonly faCircleNotch = faCircleNotch;
  readonly faPlus = faPlus;

  errorMsg = signal('');
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  selectedArticles = new Set<Article>();

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        return this.articleService.load();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg.set('Erreur Technique');
        return of(undefined);
      }),
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg.set('');
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => {
        return this.articleService.load();
      }),
      map(() => {
        this.selectedArticles.clear();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg.set('Cannot suppress');
        return of(undefined);
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

  setError(message: string) {
    this.errorMsg.set(message);
  }
}
