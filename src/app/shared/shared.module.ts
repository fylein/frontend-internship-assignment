import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, MatIconModule],
  exports: [TableViewComponent, MatIconModule]
})
export class SharedModule {}
