import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pages: number[];
  pager: any;
  currentPage: number;
  rowCount: number;
  
  @Input() perPage: number; // how many items we want to show per page
  @Input() rows: any[];
  @Output() onPage = new EventEmitter<number>();
  // @Output() goPrev = new EventEmitter<boolean>();
  // @Output() goNext = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.rowCount = this.rows.length;
    this.pages = this.getPages();
    this.pager = this.getPager();
    console.log('pagination oninit - #rows: ', this.pager);
  }
 
  goPage(page: number): void{
    this.currentPage = page;
    this.pager = this.getPager();
    this.onPage.emit(page)
  }
  
  // totalPages(): number {
  //   return Math.ceil(this.count / this.perPage) || 0;
  // }

  // lastPage(): boolean {
  //   return this.perPage * this.page > this.count;
  // }

  getPages(): number[] {
    const pages: number[] = [];
    const c = Math.ceil(this.rowCount / this.perPage);
    const p = this.currentPage || 1;
    console.log(c);




    return pages;
  }

  getPager() {
    // calculate total pages
    let totalPages = Math.ceil(this.rowCount / this.perPage);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (this.currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (this.currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = this.currentPage - 5;
            endPage = this.currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (this.currentPage - 1) * this.perPage;
    let endIndex = Math.min(startIndex + this.perPage - 1, this.rowCount - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
        totalItems: this.rowCount,
        pageSize: this.perPage,
        currentPage: this.currentPage,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        
        pages: pages
    };
}
}
