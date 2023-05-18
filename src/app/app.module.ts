import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrendingSubjectsComponent } from '../app/components/trending-subjects/trending-subjects.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [AppComponent, TrendingSubjectsComponent, HomeComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
