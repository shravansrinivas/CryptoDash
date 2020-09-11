import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent implements OnInit {


  public tableColumns: string[] = ['rank', 'name', 'market Capital in Usd', 'volume in Usd (24Hr)', 'price Usd', 'change Percent in 24Hr'];
  public dataSource: any;
  public definitions: string[] = ['rank', 'name', 'marketCapUsd', 'volumeUsd24Hr', 'priceUsd', 'changePercent24Hr'];

  closeIcon = faWindowClose;
  barPlot: any;
  debug = true;
  useResizeHandler = true;
  priceTrace: any;
  coins: any;
  constructor(private http: HttpClient, private modalClass: NgbModal) { }

  ngOnInit(): void {
    setTimeout(() => this.manageData(this.coins, this.priceTrace), 1000);
  }

  manageData(x: any, y: any) {
    this.barPlot = {
      data: [
        { x: x, y: y, type: 'bar' }
      ],
      layout: {
        title: 'Comparison of various coins',
        width: 1100,
        height: 500,
        paper_bgcolor: 'sandybrown',
        plot_bgcolor: 'green'
      }
    };
  }
  closeModal() {
    this.modalClass.dismissAll();
  }

}
