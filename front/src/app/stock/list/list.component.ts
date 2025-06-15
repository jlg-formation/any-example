import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, map, Observable, of, switchMap } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [RouterLink, FontAwesomeModule],
})
export default class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  selectedArticles = new Set<Article>();
  isRemoving = false;
  errorMsg = '';

  articleService = inject(ArticleService);
  cd = inject(ChangeDetectorRef);

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
        this.errorMsg = '';
        this.isRefreshing = true;
        return this.articleService.load();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Erreur Technique';
        return of(undefined);
      }),
      finalize(() => {
        this.isRefreshing = false;
        this.cd.markForCheck();
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
        this.isRefreshing = false;
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
}
