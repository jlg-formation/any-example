import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { StockRoutingModule } from './stock-routing.module';
import { WidgetModule } from '../widget/widget.module';
import { AsyncBtnComponent } from '../standalone/async-btn/async-btn.component';
import { AutofocusDirective } from 'widgets';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    WidgetModule,
    AsyncBtnComponent,
    AutofocusDirective,
  ],
})
export class StockModule {}
