import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { catchError, finalize, lastValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, FontAwesomeModule, RouterLink],
})
export class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  selectedArticles = new Set<Article>();
  isRemoving = false;
  errorMsg = signal('');

  cdr = inject(ChangeDetectorRef);
  articleService = inject(ArticleService);

  ngOnInit(): void {
    if (this.articleService.articles() === undefined) {
      of(undefined)
        .pipe(switchMap(() => this.articleService.load2()))
        .subscribe();
    }
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg.set('');
        this.isRefreshing = true;
        return this.articleService.load2();
      }),
      catchError((err) => {
        console.log('err: ', err);
        return of(undefined);
      }),
      finalize(() => {
        this.isRefreshing = false;
        this.cdr.markForCheck();
      }),
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg.set('');
        this.isRemoving = true;
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove2(ids);
      }),
      switchMap(() => this.articleService.load2()),
      map(() => {
        this.selectedArticles.clear();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg.set('Cannot suppress');
        return of(undefined);
      }),
      finalize(() => {
        this.isRemoving = false;
        this.cdr.markForCheck();
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
