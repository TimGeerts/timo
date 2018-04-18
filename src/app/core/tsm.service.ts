import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';

import { take } from 'rxjs/operators';
import { Item } from '../shared/models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TsmService {
    items$: Observable<Item[]> = null;

    constructor(private http: HttpClient) { }

    public getAllItems(): Observable<Item[]> {
        if (!this.items$) {
            this.items$ = this.http.get<Item[]>(environment.apiUrl)
                .publishReplay(1)
                .refCount();
        }
        return this.items$;
    }

    public getItem(id: number): Observable<Item> {
        return this.items$.map(items => items.find(item => item.Id === id));
    }
    // public getItem(itemid: number): Observable<Item> {
    //     let url = `${apiUrl}/${region}/${realm}/${itemid}?format=json&apiKey=${apiKey}`;
    //     console.log(url);
    //     return this.http
    //         .get<Item>(url)
    //         .catch(this.handleError);
    // }
}