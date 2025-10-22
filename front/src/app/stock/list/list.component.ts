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
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, FontAwesomeModule, RouterLink, AsyncBtnComponent],
})
export class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  selectedArticles = new Set<Article>();

  errorMsg = signal('');

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
        return this.articleService.load2();
      }),
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove2(ids);
      }),
      switchMap(() => this.articleService.load2()),
      map(() => {
        this.selectedArticles.clear();
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

  setError(err: unknown) {
    if (err === undefined) {
      this.errorMsg.set('');
      return;
    }
    if (err instanceof Error) {
      this.errorMsg.set(err.message);
      return;
    }
    console.log('err: ', err);
    this.errorMsg.set('Technical Error');
  }
}
