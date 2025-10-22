import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { getErrorMsg } from '../../../utils/getErrorMsg';
import { ArticleService } from '../../services/article.service';
import { blackListValidator } from '../../validators/blacklist.validator';
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';
import { AutofocusDirective } from '../../widgets/autofocus.directive';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AutofocusDirective,
    AsyncBtnComponent,
  ],
})
export class CreateComponent implements OnInit {
  errorMsg = '';
  f = new FormBuilder().nonNullable.group({
    name: ['Truc', [Validators.required, Validators.minLength(4), blackListValidator]],
    price: [0, [Validators.required]],
    qty: [0, [Validators.required]],
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  getErrorMsg = getErrorMsg;
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  submit(): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() => this.articleService.add2(this.f.getRawValue())),
      switchMap(() => this.articleService.load2()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
    );
  }

  setError(err: unknown) {
    if (err === undefined) {
      this.errorMsg = '';
      return;
    }
    if (err instanceof Error) {
      this.errorMsg = err.message;
      return;
    }
    console.log('err: ', err);
    this.errorMsg = 'Technical Error';
  }
}
