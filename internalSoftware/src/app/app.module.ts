import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkItemsComponent } from './components/linkItems/link-items/link-items.component';
import { LinkItemsLineItemComponent } from './components/linkItems/link-items-line-item/link-items-line-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkItemsComponent,
    LinkItemsLineItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
