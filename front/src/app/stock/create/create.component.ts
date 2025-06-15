import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';

import { NewArticle } from '../../interfaces/article';
import { FG } from '../../interfaces/form';
import { ArticleService } from '../../services/article.service';
import { BlackListService } from '../../services/black-list.service';
import { ErrorService } from '../../services/error.service';
import { blackListValidator } from '../../validators/black-list.validator';
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  imports: [ReactiveFormsModule, FontAwesomeModule, AsyncBtnComponent],
})
export default class CreateComponent {
  readonly articleService = inject(ArticleService);
  readonly blackListService = inject(BlackListService);
  readonly errorService = inject(ErrorService);
  readonly fb = inject(FormBuilder);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  errorMsg = signal('');
  f = this.fb.group<FG<NewArticle>>({
    name: this.fb.nonNullable.control(
      'Truc',
      [Validators.required, Validators.maxLength(10)],
      [blackListValidator(this.blackListService)],
    ),
    price: this.fb.nonNullable.control(0, [
      Validators.required,
      Validators.min(0),
    ]),
    qty: this.fb.nonNullable.control(1, Validators.required),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;

  setError(message: string) {
    this.errorMsg.set(message);
  }

  public submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.errorMsg.set('');
      }),
      switchMap(() => this.articleService.add(this.f.getRawValue())),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
      catchError((err) => {
        console.log('err: ', err);
        if (err instanceof Error) {
          this.errorMsg.set(err.message);
        }
        return of(undefined);
      }),
    );
  }
}
