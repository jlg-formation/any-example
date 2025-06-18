import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  Observable,
  catchError,
  delay,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [FontAwesomeModule, ReactiveFormsModule, AsyncBtnComponent],
})
export default class CreateComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  errorMsg = '';
  f = new FormGroup({
    name: new FormControl('Truc', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  ngOnInit(): void {}

  submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isAdding = true;
      }),
      delay(1000),
      switchMap(() => this.articleService.add(this.f.value as NewArticle)),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
      catchError((err) => {
        console.log('err: ', err);
        if (err instanceof Error) {
          this.errorMsg = err.message;
        }
        return of(undefined);
      }),
      finalize(() => {
        this.isAdding = false;
      }),
    );
  }
}
