import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataManagementService } from '../services/data-management.service';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  debug = true;
  useResizeHandler = true;

  barPlot: any;
  coins: any;
  exchanges: any;
  topExchanges = [];
  topCoins = [];
  upArrow = faArrowCircleUp;
  downArrow = faArrowCircleDown;
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  constructor(private dataService: DataManagementService, private router: Router) { }


  ngOnInit(): void {
    this.topCoins = this.dataService.getTopCoins();
    this.topExchanges = this.dataService.getTopExchanges();
    this.dataService.getAllCoins().subscribe(data => {
      this.coins = data.rows;

    });
    this.dataService.getAllExchanges().subscribe(data => {
      this.exchanges = data.rows;
    });
  //  this.getPlotData();
  }

  getPlotData() {
    const x = [];
    const y = [];
    setTimeout(() => {
      this.topCoins.forEach(coin => {
        x.push(coin.priceUsd);
        y.push(coin.id);
      });
    }, 1000);
    this.barPlot = {
      data: [
        { x: y, y: x, type: 'line' }
      ],
      layout: {
        title: 'Comparison of various coin prices',
        width: 460,
        height: 450,
        paper_bgcolor: 'sandybrown',
        plot_bgcolor: 'white'
      }
    };
  }

  remove(param, type) {
    if (type === 'exchange') {
      const index = this.topExchanges.indexOf(param);

      if (index >= 0) {
        this.topExchanges.splice(index, 1);
      }
    }
    else if (type === 'coin') {
      const index = this.topCoins.indexOf(param);

      if (index >= 0) {
        this.topCoins.splice(index, 1);
      }

    }
  }
}
