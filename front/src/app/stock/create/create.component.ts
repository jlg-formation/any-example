import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom, timer } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { NewArticle } from '../../interfaces/article';

type FG<T extends object> = {
  [key in keyof T]: AbstractControl<T[key]>;
};
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [ReactiveFormsModule, FontAwesomeModule],
})
export default class CreateComponent implements OnInit {
  errorMsg = '';
  f: FormGroup<FG<NewArticle>>;
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.f = this.fb.group<FG<NewArticle>>({
      name: this.fb.nonNullable.control('Truc', Validators.required),
      price: this.fb.nonNullable.control(0, Validators.required),
      qty: this.fb.nonNullable.control(1, Validators.required),
    });
  }

  ngOnInit(): void {}

  async submit() {
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
