import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CheckinAssetComponent } from './components/checkin-asset/checkin-asset.component';
import { CheckoutAssetComponent } from './components/checkout-asset/checkout-asset.component';
import { RetireAssetComponent } from './components/retire-asset/retire-asset.component';

const appRoutes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'checkout-asset', component: CheckoutAssetComponent },
  { path: 'checkin-asset', component: CheckinAssetComponent },
  { path: 'retire-asset', component: RetireAssetComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    AddAssetComponent,
    CheckoutAssetComponent,
    CheckinAssetComponent,
    RetireAssetComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
