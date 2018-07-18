import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CheckinAssetComponent } from './components/checkin-asset/checkin-asset.component';
import { CheckoutAssetComponent } from './components/checkout-asset/checkout-asset.component';
import { RetireAssetComponent } from './components/retire-asset/retire-asset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowseAssetsComponent } from './components/browse-assets/browse-assets.component';
import { AssetService } from './services/asset.service';
import { UtilitiesService } from './services/utilities.service';
import { AssetEditModalComponent } from './components/modals/asset-edit-modal/asset-edit-modal.component';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';

const appRoutes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'settings', component: SettingsViewComponent },
  { path: 'browse-assets', component: BrowseAssetsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    AddAssetComponent,
    CheckoutAssetComponent,
    CheckinAssetComponent,
    RetireAssetComponent,
    NavbarComponent,
    BrowseAssetsComponent,
    AssetEditModalComponent,
    SettingsViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    AssetService,
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
