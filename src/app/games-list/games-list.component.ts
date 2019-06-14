import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  // dataSource: string;
  csvContent: string;
  text: any;
  JSONData: any;

  displayedColumns: string[] = ['Rank', 'Name', 'Platform', 'Year', 'Genre', 'Publisher', 'Global_Sales'];
  // dataSource: MatTableDataSource<{}>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any[]>();
  // @ViewChild(MatTableDataSource) dataSource: MatTableDataSource<any>;

  // dataSource: string;

  csvJSON(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    // tslint:disable-next-line:prefer-const
    let headers = lines[0].split(',');
    console.log(headers);
    for (let i = 1; i < lines.length - 1; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
  // return result; //JavaScript object
   console.log(JSON.stringify(result)); // JSON
   this.JSONData = JSON.stringify(result);
   this.dataSource.data = result;
   // return this.JSONData;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  // let dataSource;
    this.http.get('assets/csv/vgsales55c93b8.csv', {responseType: 'text'} )
    .subscribe((data ) => {
        this.csvContent = data;
       // this.dataSource = data;
        // this.dataSource = this.csvJSON(this.csvContent);
        this.csvJSON(this.csvContent);
        // console.log(data);
        // console.log('CsV Data : ' + this.JSONData);
        console.log('Data Source : ' + this.dataSource);
      },
      // Error Log
      error => {
        console.log(error);
      });
 }
}
