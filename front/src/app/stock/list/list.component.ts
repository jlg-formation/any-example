import { Component, OnInit, inject, signal } from '@angular/core';
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
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [FontAwesomeModule, RouterLink, AsyncBtnComponent],
})
export default class ListComponent implements OnInit {
  protected readonly articleService = inject(ArticleService);

  errorMsg = signal('');
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
    return this.articleService.load();
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => this.articleService.load()),
      tap(() => this.selectedArticles.clear()),
    );
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  setErrorMsg(message: string) {
    this.errorMsg.set(message);
  }
}
