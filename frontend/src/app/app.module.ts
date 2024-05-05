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
import { DeliveryHomeComponent } from './delivery/delivery-home/delivery-home.component';
import { DeliveryListComponent } from './delivery/delivery-list/delivery-list.component';
import { DeliveryItemComponent } from './delivery/delivery-item/delivery-item.component';
import { DeliveryFilterComponent } from './delivery/delivery-filter/delivery-filter.component';
import { OfferFilterPipe } from './pipes/offer-filter.pipe';
import { DeliveryAddOfferComponent } from './delivery/delivery-add-offer/delivery-add-offer.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { DeliveryEditOfferComponent } from './delivery/delivery-edit-offer/delivery-edit-offer.component';
import { DeliveryOfferDetailsComponent } from './delivery/delivery-offer-details/delivery-offer-details.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { CarpoolingEditOfferComponent } from './carpooling/carpooling-edit-offer/carpooling-edit-offer.component';
import { DeliverySendRequestComponent } from './delivery/delivery-send-request/delivery-send-request.component';
import { OffersManagementComponent } from './offers-management/offers-management.component';
import { OffersRequestsComponent } from './offers-requests/offers-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsComponent,
    OffersComponent,
    HomeComponent,
    NavbarComponent,
    AboutUsComponent,
    FooterComponent,
    CarpoolingHomeComponent,
    CarpoolingFiltersComponent,
    CarpoolingListComponent,
    CarpoolingItemsComponent,
    PostOfferModalComponent,
    RequestModalComponent,
    CarpoolingDetailsModalComponent,
    DeliveryHomeComponent,
    DeliveryListComponent,
    DeliveryItemComponent,
    DeliveryFilterComponent,
    OfferFilterPipe,
    DeliveryAddOfferComponent,
    DeliveryEditOfferComponent,
    DeliveryOfferDetailsComponent,
    ProfileManagementComponent,
    CarpoolingEditOfferComponent,
    DeliverySendRequestComponent,
    OffersManagementComponent,
    OffersRequestsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
