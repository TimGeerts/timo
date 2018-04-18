import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { WowCurrencyPipe } from './pipes/wow-currency.pipe';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [CommonModule ],
  exports: [WowCurrencyPipe, TableComponent],
  declarations: [WowCurrencyPipe, TableComponent, PaginationComponent],
  providers: [],
})
export class SharedModule { }
