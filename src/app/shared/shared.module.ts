import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import {MatIconModule} from '@angular/material/icon';
import { ResultTableViewComponent } from './result-table-view/result-table-view.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [TableViewComponent, ResultTableViewComponent],
  imports: [CommonModule, MatIconModule, MatTableModule],
  exports: [TableViewComponent, MatIconModule, ResultTableViewComponent],
})
export class SharedModule {}
