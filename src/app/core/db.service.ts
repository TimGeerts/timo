import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Item } from '../shared/models/item.model';
import { AngularFireList } from 'angularfire2/database/interfaces';

const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;
const region = environment.region;
const realm = environment.realm;

@Injectable()
export class DbService {
  tsm: AngularFireObject<{}>;
  items: Observable<Item[]>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) { 
    this.tsm = this.db.object('/tsm');
  }

  public refreshItem(itemid: number): Observable<void> {
    let url = `${apiUrl}/${region}/${realm}/${itemid}?format=json&apiKey=${apiKey}`;
    return this.http.get<Item>(url).catch(this.handleError).map((item: Item) => {
      console.log(item);
      this.tsm.set({ "lastupdate": +new Date, "item": item });
    })
  }

  public refreshAllItems(): Observable<void> {
    let url = `${apiUrl}/${region}/${realm}?format=json&apiKey=${apiKey}`;
    return this.http.get<Item[]>(url).catch(this.handleError).map((items: Item[]) => {
      this.tsm.set({ "lastupdated": +new Date, "items": items });
    });
  }

  public getItems(): Observable<any>{
    return this.db.list("/tsm/items", ref => ref.limitToFirst(5)).valueChanges()
    // return this.db.list("/tsm/items/9099").valueChanges()
  }

  // public getItem(id: number): Observable<Item>{
    
  //   return null;
  // }

  

  private handleError(error: Response | any) {
    console.error('DbService::handleError', error);
    return Observable.throw(error);
  }
}