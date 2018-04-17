import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Item } from '../shared/models/item.model';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AngularFireLiteDatabase } from 'angularfire-lite';


const apiUrl = environment.apiUrl;

@Injectable()
export class DbService {
  items: Observable<Item[]>;

  constructor(private http: HttpClient, private db: AngularFireLiteDatabase) { }

  // public refreshItem(itemid: number): Observable<void> {
  //   let url = `${apiUrl}/${region}/${realm}/${itemid}?format=json&apiKey=${apiKey}`;
  //   return this.http.get<Item>(url).catch(this.handleError).map((item: Item) => {
  //     console.log(item);
  //     this.db.write('/tsm', { "lastupdate": +new Date, "item": item });
  //   })
  // }

  // public refreshAllItems(): Observable<void> {
  //   let url = `${apiUrl}/${region}/${realm}?format=json&apiKey=${apiKey}`;
  //   return this.http.get<Item[]>(url).catch(this.handleError).map((items: Item[]) => {
  //     this.db.write('/tsm', { "lastupdated": +new Date, "items": items });
  //   });
  // }

  public getItems(): Observable<any>{
    return this.db.query('/tsm/items').limitToFirst(5).on('value').map(response => {
      console.log('service ', response);
      return response;
    });
  }


  private handleError(error: Response | any) {
    console.error('DbService::handleError', error);
    return Observable.throw(error);
  }
}