import { Component, OnInit } from '@angular/core';
import { DbService } from '../../core/db.service';
import { Item } from '../../shared/models/item.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { TsmService } from '../../core/tsm.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;
  items: Item[];
  
  refreshing: boolean;
  page: number;
  pageSize: number = 20;

  constructor(private dbService: DbService, private tsmService: TsmService) { }

  ngOnInit() {
    this.items$ = this.tsmService.getAllItems();
    this.items$.subscribe((data) => {
      this.items = data;
    });
  }
  




  refreshItem(id: number) {
    let self = this;
    self.refreshing = true;
    // this.dbService.refreshItem(id).subscribe((i) => {
    //   self.refreshing = false;
    // });
  }

  getItem(id: number) {
    this.tsmService.getItem(id).subscribe((i) => console.log(i));
  }

  refreshAllItems() {
    // let self = this;
    // self.refreshing = true;
    // this.dbService.refreshAllItems().subscribe((i) => {
    //   self.refreshing = false;
    // });
    this.items$ = this.tsmService.getAllItems();
  }
}
