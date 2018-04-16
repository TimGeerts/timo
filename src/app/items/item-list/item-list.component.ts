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
  refreshing: boolean;
  items$: Observable<Item[]>;

  constructor(private dbService: DbService, private tsmService: TsmService) { }

  ngOnInit() {
    // this.dbService.getItems().subscribe((items) => {
    //   console.log(items);
    //   this.items = items;
    // });
    // this.items$ = this.dbService.getItems();
    console.log('component: init get items');
    this.items$ = this.tsmService.getAllItems();
  }

  refreshItem(id: number) {
    let self = this;
    self.refreshing = true;
    this.dbService.refreshItem(id).subscribe((i) => {
      self.refreshing = false;
    });
  }

  getItem(id: number){
    this.tsmService.getItem(id).subscribe((i) => console.log(i));
  }

  refreshAllItems() {
    // let self = this;
    // self.refreshing = true;
    // this.dbService.refreshAllItems().subscribe((i) => {
    //   self.refreshing = false;
    // });
    console.log('component: refreshing items');
    this.items$ = this.tsmService.getAllItems();
  }
}
