import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { legalGuard } from './guards/legal.guard';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { StockModule } from './stock/stock.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'stock', loadChildren: () => StockModule, canActivate: [legalGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
