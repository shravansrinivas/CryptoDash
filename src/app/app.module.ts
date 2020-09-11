import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DataGridExchangeComponent } from './data-grid-exchange/data-grid-exchange.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav'; // For MDB Angular Free
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { MatChipsModule, MatChipRemove, MatChipEvent } from '@angular/material/chips';
import {BreadcrumbModule} from 'angular-crumbs';
// import { ChartsModule, WavesModule } from 'mdbootstrap';
// For MDB Angular Free
// import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
// import { RendererComponent } from './renderer/renderer.component';
import 'chartjs-plugin-zoom';
import { CoinCardComponent } from './coin-card/coin-card.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeComponent } from './home/home.component';
import { ExchangeDetailsComponent } from './exchange-details/exchange-details.component';
import { TabViewComponent } from './tab-view/tab-view.component';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent,
    HeaderComponent,
    DataGridExchangeComponent,
  //  RendererComponent,
    CoinCardComponent,
    HomeComponent,
    ExchangeDetailsComponent,
    TabViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([DataGridComponent, DataGridExchangeComponent]),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    ChartsModule,
    FormsModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    NgbModule,
    DragDropModule,
    MatChipsModule,
    MatIconModule,
    PlotlyModule,
    BreadcrumbModule,
    RouterModule

    // WavesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
