import { Component, OnChanges, Input } from '@angular/core';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnChanges {
  @Input() items: Item[];
  @Input() paging: boolean = true;
  @Input() pageSize: number = 10;

  filteredItems: Item[];

  constructor() {
    console.log('constructor');
  }

  ngOnChanges(): void {
    if (this.paging) {
      console.log('ngOnChanges ', this.items);
      this.filteredItems = this.items ? this.items.slice(0, this.pageSize) : [];
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit ', this.items);

  }

  onPage(p: number) {
    if (!this.items || !this.items.length || p < 1 || p > this.items.length) {
      return;
    }
    let start = p * this.pageSize - this.pageSize;
    let end = p * this.pageSize;
    this.filteredItems = this.items.slice(start, end);
  }
}