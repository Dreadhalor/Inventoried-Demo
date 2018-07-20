import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SettingsService } from '../../services/settings.service';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _us: UserService,
    private ss: SettingsService,
    private assets: AssetService
  ) { }
  get us(){return this._us;}

  ngOnInit() {
    this.us.pullUser();
  }

  stringify(thing){
    return JSON.stringify(thing);
  }

}
