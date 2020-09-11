import { Component, OnInit, ViewChild } from '@angular/core';
import 'ag-grid-enterprise';
import { AgGridAngular, AgRendererComponent, AgGridModule } from 'ag-grid-angular';
import { Router, RouterModule } from '@angular/router';
import { DataManagementService } from '../services/data-management.service';
@Component({
  selector: 'app-data-grid-exchange',
  templateUrl: './data-grid-exchange.component.html',
  styleUrls: ['./data-grid-exchange.component.css']
})
export class DataGridExchangeComponent implements OnInit {
  constructor( private router: Router, private dataService: DataManagementService) { }
  @ViewChild('agGrid') agGrid: AgGridAngular;
  // Static Columns
  /*columnDefs = [
    { headerName: 'Trust Score Rank', field: 'trust_score_rank', pinned: 'left'},
    { headerName: 'Name', field: 'name' },
    { headerName: 'Year Established', field: 'year_established' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'Trust Score', field: 'trust_score' }
  ];*/
  columnDefs: any = [];
  rowData: any;
  dataSearch: string;
  frameworkComponents;
  private gridApi;
  private gridColumnApi;
  // columnDefs: ColDef[];
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
  ngOnInit() {

    const columns = ['trust_score_rank', 'name', 'year_established', 'country', 'trust_score'];
    const sortableColumns = ['trust_score_rank', 'year_established', 'trust_score'];
    const filterableColumns = ['name', 'country'];
    columns.forEach((column) => {
      const definition = {
        headerName: column.toUpperCase().replace('_', ' '),
        field: column,
        sortable: false,
        filter: false,
      };
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

      this.columnDefs.push(definition);
    });

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.dataService.getAllExchanges().subscribe(res => {
      //  console.log(res.rows);
      const rows: any = [];
      res.rows.forEach(element => {
        rows.push(element.doc);
      });
      this.gridApi.setRowData(rows);
    });



  }



  applyQuickSearch() {
    this.gridApi.setQuickFilter(this.dataSearch);
  }

  onRowClicked(event) {
    this.router.navigate(['home/exchanges/', event.data.id]);
  }
}


