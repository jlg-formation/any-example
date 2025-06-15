import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';

import { lastValueFrom, timer } from 'rxjs';

import { NewArticle } from '../../interfaces/article';
import { FG } from '../../interfaces/form';
import { ArticleService } from '../../services/article.service';
import { BlackListService } from '../../services/black-list.service';
import { ErrorService } from '../../services/error.service';
import { blackListValidator } from '../../validators/black-list.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  imports: [ReactiveFormsModule, FontAwesomeModule],
})
export default class CreateComponent implements OnInit {
  public errorMsg = '';
  public f: FormGroup<FG<NewArticle>>;
  public faCircleNotch = faCircleNotch;
  public faPlus = faPlus;
  public isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private blackListService: BlackListService,
    protected errorService: ErrorService,
  ) {
    this.f = this.fb.group<FG<NewArticle>>({
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
  }

  public ngOnInit(): void {}

  public async submit() {
    try {
      this.isAdding = true;
      await lastValueFrom(timer(1000));
      await this.articleService.add(this.f.getRawValue());
      await this.articleService.load();
      await this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
      if (err instanceof Error) {
        this.errorMsg = err.message;
      }
    } finally {
      this.isAdding = false;
    }
  }
}
