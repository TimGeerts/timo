import { Component, OnInit } from '@angular/core';
import { DbService } from '../../core/db.service';
import { Item } from '../../shared/models/item.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  refreshing: boolean;
  items: Observable<Item[]>;

  constructor(private dbService: DbService) { }

  ngOnInit() {
    // this.dbService.getItems().subscribe((items) => {
    //   console.log(items);
    //   this.items = items;
    // });
    this.items = this.dbService.getItems().take(1);
  }

  refreshItem(id: number) {
    let self = this;
    self.refreshing = true;
    this.dbService.refreshItem(id).subscribe((i) => {
      self.refreshing = false;
    });
  }

  refreshAllItems() {
    let self = this;
    self.refreshing = true;
    this.dbService.refreshAllItems().subscribe((i) => {
      self.refreshing = false;
    });
  }
}
