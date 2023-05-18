import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, MatIconModule, MatPaginatorModule, ReactiveFormsModule, MatTableModule

  ],
  exports: [TableViewComponent, MatIconModule]
})
export class SharedModule { }
