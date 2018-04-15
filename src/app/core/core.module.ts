import { NgModule } from '@angular/core';
import { TsmService } from './tsm.service';
import { DbService } from './db.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';


@NgModule({
    imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
        // AngularFireAuthModule
    ],
    exports: [],
    declarations: [],
    providers: [
        TsmService, 
        DbService,
        HttpClientModule, 
        // AngularFirestoreModule,
        // AngularFireDatabaseModule
    ],
})
export class CoreModule { }
