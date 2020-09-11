import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataManagementService } from '../services/data-management.service';
@Component({
  selector: 'app-exchange-details',
  templateUrl: './exchange-details.component.html',
  styleUrls: ['./exchange-details.component.css']
})
export class ExchangeDetailsComponent implements OnInit, OnDestroy {

  exchangeId: any;
  exchangeDetails: any;
  private routeSub: any;
  constructor(private route: ActivatedRoute, private dataService: DataManagementService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(param => {
      this.exchangeId = param['id'];
    });

    this.dataService.getExchange(this.exchangeId).subscribe(obj => {
      this.exchangeDetails = obj;

    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
