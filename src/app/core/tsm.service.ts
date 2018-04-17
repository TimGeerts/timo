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
        console.log('service: getAllItems');
        if (!this.items$) {
            console.log(`service: getAllItems - getting new items from tsm api at ${environment.apiUrl}.`);
            this.items$ = this.http.get<Item[]>(environment.apiUrl)
                .publishReplay(1)
                .refCount();
        }

        const example = this.items$.pipe(take(5));
        const subscribe = example.subscribe(val => console.log(val));

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