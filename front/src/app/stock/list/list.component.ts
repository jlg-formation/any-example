import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Observable, catchError, finalize, map, of, switchMap } from 'rxjs';

import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [RouterLink, FontAwesomeModule, AsyncBtnComponent],
})
export default class ListComponent implements OnInit {
  articleService = inject(ArticleService);
  cd = inject(ChangeDetectorRef);
  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  selectedArticles = new Set<Article>();

  ngOnInit(): void {
    of(undefined)
      .pipe(
        switchMap(() => this.articleService.load()),
        map(() => {
          this.cd.markForCheck();
        }),
      )
      .subscribe();
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        return this.articleService.load();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Erreur Technique';
        return of(undefined);
      }),
      finalize(() => {
        this.cd.markForCheck();
      }),
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
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
        this.errorMsg = 'Cannot suppress';
        return of(undefined);
      }),
      finalize(() => {
        this.cd.markForCheck();
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
    this.errorMsg = message;
  }
}
