import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Item } from '../shared/models/item.model';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;
const region = environment.region;
const realm = environment.realm;

@Injectable()
export class TsmService {
    constructor(private http: HttpClient, private db: AngularFirestore) { }

    public getAllItems(): Observable<any[]> {
        return this.http
            .get(apiUrl + '/todos')
            .catch(this.handleError);
    }
    public getItem(itemid: number): Observable<Item> {
        let url = `${apiUrl}/${region}/${realm}/${itemid}?format=json&apiKey=${apiKey}`;
        console.log(url);
        return this.http
            .get<Item>(url)
            .catch(this.handleError);
    }

    public refresh(){
        let itemCol = this.db.collection('items');
        itemCol.add({ description: 'test', minbuyout: 10 });
    }

    private handleError(error: Response | any) {
        console.error('TsmService::handleError', error);
        return Observable.throw(error);
    }
}