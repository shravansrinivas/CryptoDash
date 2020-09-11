import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataGridExchangeComponent } from './data-grid-exchange/data-grid-exchange.component';
import { HomeComponent } from './home/home.component';
import { ExchangeDetailsComponent } from './exchange-details/exchange-details.component';


const routes: Routes = [
  {

    path: 'home', data: { breadcrumb: 'Home' },
    children: [
      {
        path: '', component: HomeComponent
      },

      {
        path: 'coins', data: { breadcrumb: 'Coins' }, children: [
          { path: '', component: DataGridComponent }
        ]
      },
      {
        path: 'exchanges', data: { breadcrumb: 'Exchanges' },

        children: [
          { path: '', component: DataGridExchangeComponent, data: { breadcrumb: 'Exchanges' } },

          {
            path: ':id', component: ExchangeDetailsComponent, data: { breadcrumb: 'Exchange Details' }
          }
        ]
      }
    ]
  },
  {
    path: '**', component: HomeComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
