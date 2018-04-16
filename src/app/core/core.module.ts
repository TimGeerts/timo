import { NgModule } from '@angular/core';
import { TsmService } from './tsm.service';
import { DbService } from './db.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        HttpClientModule,
        AngularFireLite.forRoot(environment.firebase)
    ],
    exports: [],
    declarations: [],
    providers: [
        TsmService, 
        DbService,
        HttpClientModule
    ],
})
export class CoreModule { }
