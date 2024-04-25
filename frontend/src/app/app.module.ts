import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsComponent } from './requests/requests.component';
import { OffersComponent } from './offers/offers.component';
import { CarpoolingHomeComponent } from './carpooling/carpooling-home/carpooling-home.component';
import { CarpoolingFiltersComponent } from './carpooling/carpooling-filters/carpooling-filters.component';
import { CarpoolingListComponent } from './carpooling/carpooling-list/carpooling-list.component';
import { CarpoolingItemsComponent } from './carpooling/carpooling-items/carpooling-items.component';
import { PostOfferModalComponent } from './carpooling/post-offer-modal/post-offer-modal.component';
import { RequestModalComponent } from './carpooling/request-modal/request-modal.component';
import { CarpoolingDetailsModalComponent } from './carpooling/carpooling-details-modal/carpooling-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsComponent,
    OffersComponent,
    CarpoolingHomeComponent,
    CarpoolingFiltersComponent,
    CarpoolingListComponent,
    CarpoolingItemsComponent,
    PostOfferModalComponent,
    RequestModalComponent,
    CarpoolingDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
