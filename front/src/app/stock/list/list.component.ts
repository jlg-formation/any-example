import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { RouterLink } from '@angular/router';
import { lastValueFrom, map, of, switchMap } from 'rxjs';

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
        switchMap(() => this.articleService.load2()),
        map(() => {
          this.cd.markForCheck();
        }),
      )
      .subscribe();
  }

  async refresh() {
    try {
      this.errorMsg = '';
      this.isRefreshing = true;
      await lastValueFrom(this.articleService.load2());
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Erreur Technique';
    } finally {
      this.isRefreshing = false;
      this.cd.markForCheck();
    }
  }

  async remove() {
    try {
      this.errorMsg = '';
      this.isRemoving = true;
      const ids = [...this.selectedArticles].map((a) => a.id);
      await lastValueFrom(this.articleService.remove2(ids));
      await lastValueFrom(this.articleService.load2());
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Cannot suppress';
    } finally {
      this.isRemoving = false;
      this.cd.markForCheck();
    }
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
