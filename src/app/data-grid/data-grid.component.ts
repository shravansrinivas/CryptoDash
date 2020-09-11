import { Component, OnInit, ViewChild } from '@angular/core';
import 'ag-grid-enterprise';
import { AgGridAngular } from 'ag-grid-angular';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoinCardComponent } from '../coin-card/coin-card.component';
import { TabViewComponent } from '../tab-view/tab-view.component';
import { DataManagementService } from '../services/data-management.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})



export class DataGridComponent implements OnInit {
  constructor(private modalService: NgbModal, private dataService: DataManagementService) { }
  @ViewChild('agGrid') agGrid: AgGridAngular;

  displayedColumns: string[] = ['id', 'rank', 'name', 'marketCapUsd', 'volumeUsd24Hr', 'priceUsd', 'changePercent24Hr', 'vwap24Hr'];

  private gridApi;
  private gridColumnApi;
  dataSearch: string;
  rowData: any;
  rowDataTable: any = [];
  frameworkComponents;
  modalClass: NgbModal;


  columnDefs: any = [];


  rowSelected: any;

  // Exporting as Excel
  exportExcelSheet(): void {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'Trust Index',
      sheetName: 'Trust Index Sheet-1'
    };
    this.agGrid.api.exportDataAsExcel(params);
  }
  // Exporting as CSV
  exportCSVSheet(): void {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'Trust Index',
      sheetName: 'Trust Index Sheet-1'
    };
    this.agGrid.api.exportDataAsCsv(params);
  }
  ngOnInit() {

    const columns = ['id', 'rank', 'name', 'symbol'];
    const sortableColumns = ['rank', 'id'];
    const filterableColumns = ['name'];
    const pinnedColumns = ['id'];
    columns.forEach((column) => {
      const definition = {
        headerName: column.toUpperCase().replace('_', ' '),
        field: column,
        sortable: false,
        filter: false,
        pinned: '',
        cellClass: '',
        checkboxSelection: false,
        rowDrag: false
      };
      if (column === 'id') {
        definition.checkboxSelection = true;
        //  definition.rowDrag= true;
      }
      sortableColumns.forEach((ele) => {
        if (column === ele) {
          definition.sortable = true;

        }
      });
      filterableColumns.forEach((ele) => {
        if (column === ele) {
          definition.filter = true;
        }
      });
      pinnedColumns.forEach((ele) => {
        if (column === ele) {
          definition.pinned = 'left';
          definition.cellClass = 'lock-pinned';
        }
      });

      this.columnDefs.push(definition);
    });

  }

  compareSelected() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedRows = selectedNodes.map(node => node.data);
    const selectedIDs = selectedRows.map(node => node.id);
    const selectedIDString = selectedRows.map(node => node.id).toString();

    if (selectedIDs.length >= 2) {
      const dataSource = [];
      const priceTrace = [];
      const coins = [];
      selectedIDs.forEach(coin => {
        this.dataService.getCoin(coin).subscribe(data => {
          console.log(data);
          dataSource.push(data);
          priceTrace.push(data.priceUsd);
          coins.push(data.id);
        });
      });

      TabViewComponent.prototype.dataSource = dataSource;
      TabViewComponent.prototype.priceTrace = priceTrace;
      TabViewComponent.prototype.coins = coins;
      this.modalService.open(TabViewComponent, { backdrop: 'static', size: 'xl', keyboard: false, centered: true });
    }
    else if (selectedIDs.length === 1) {
      alert('Please select more than one coins to compare!');

    }
    else { alert('Nothing selected!! Please select coins to compare!'); }
  }

  onGridReady(params) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const rows: any[] = [];

    this.dataService.getAllCoins().subscribe(res => {

      res.rows.forEach(element => {
        rows.push(element.doc);
      });
      this.gridApi.setRowData(rows);
      this.gridApi.setColumnDefs(this.columnDefs);
      this.gridApi.sizeColumnsToFit();
      // console.log(this.rowData.length);
      //  console.log(rows);

    });
  }
  onRowClicked(event: any) {
    CoinCardComponent.prototype.changePercent24Hr = event.data.changePercent24Hr;
    CoinCardComponent.prototype.name = event.data.name;
    CoinCardComponent.prototype.marketCapUsd = event.data.marketCapUsd;
    CoinCardComponent.prototype.priceUsd = event.data.priceUsd;
    CoinCardComponent.prototype.rank = event.data.rank;
    CoinCardComponent.prototype.volumeUsd24Hr = event.data.volumeUsd24Hr;

    this.modalService.open(CoinCardComponent, { backdrop: 'static', size: 'lg', keyboard: false, centered: true });

    if (this.rowSelected === event.data) {
      this.rowSelected = null;
    }
    else { this.rowSelected = event.data; }
  }

  // closing modals
  closeModal() {
    this.modalService.dismissAll();
  }


  // Quick search -- ag grid api
  applyQuickSearch() {
    this.gridApi.setQuickFilter(this.dataSearch);
  }


}
