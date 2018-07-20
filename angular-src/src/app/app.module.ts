import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CheckinAssetComponent } from './components/checkin-asset/checkin-asset.component';
import { CheckoutAssetComponent } from './components/checkout-asset/checkout-asset.component';
import { RetireAssetComponent } from './components/retire-asset/retire-asset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowseAssetsComponent } from './components/browse-assets/browse-assets.component';
import { AssetService } from './services/asset.service';
import { UtilitiesService } from './services/utilities.service';
import { AssetEditModalComponent } from './components/modals/asset-edit-modal/asset-edit-modal.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsCardComponent } from './components/settings-view/settings-card/settings-card.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddAssetModalComponent } from './components/modals/add-asset-modal/add-asset-modal.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { CheckoutModalComponent } from './components/modals/checkout-modal/checkout-modal.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { UserViewModalComponent } from './components/modals/user-view-modal/user-view-modal.component';
import { AdminGuardService } from './guards/admin-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'settings', component: SettingsViewComponent, canActivate: [AdminGuardService] },
  { path: 'browse-assets', component: BrowseAssetsComponent, canActivate: [AdminGuardService] },
  { path: 'directory', component: DirectoryComponent, canActivate: [AdminGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CheckoutAssetComponent,
    CheckinAssetComponent,
    RetireAssetComponent,
    NavbarComponent,
    BrowseAssetsComponent,
    AssetEditModalComponent,
    SettingsViewComponent,
    SettingsCardComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddAssetModalComponent,
    DirectoryComponent,
    CheckoutModalComponent,
    UserViewModalComponent
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
    UtilitiesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
