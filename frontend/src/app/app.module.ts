import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { AppComponent } from './app.component';
import { RequestsComponent } from './requests/requests.component';
import { OffersComponent } from './offers/offers.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './footer/footer.component';
import { CarpoolingFiltersComponent } from './carpooling/carpooling-filters/carpooling-filters.component';
import { CarpoolingListComponent } from './carpooling/carpooling-list/carpooling-list.component';
import { CarpoolingItemsComponent } from './carpooling/carpooling-items/carpooling-items.component';
import { PostOfferModalComponent } from './carpooling/post-offer-modal/post-offer-modal.component';
import { RequestModalComponent } from './carpooling/request-modal/request-modal.component';
import { CarpoolingDetailsModalComponent } from './carpooling/carpooling-details-modal/carpooling-details-modal.component';
import { CarpoolingHomeComponent } from './carpooling/carpooling-home/carpooling-home.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsComponent,
    OffersComponent,
    HomeComponent,
    NavbarComponent,
    DeliveryComponent,
    AboutUsComponent,
    FooterComponent,
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
    CarouselModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
