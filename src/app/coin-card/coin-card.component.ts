import { Component, OnInit } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.css']
})

export class CoinCardComponent implements OnInit {
  name: any;
  rank: any;
  priceUsd: any;
  marketCapUsd: any;
  volumeUsd24Hr: any;
  changePercent24Hr: any;

  closeIcon = faWindowClose;

  closeModal(){
    this.modalClass.dismissAll();
  }
  constructor(private modalClass: NgbModal) { }

  ngOnInit(): void {
  }

}
