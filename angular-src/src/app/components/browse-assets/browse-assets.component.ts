import { Component, OnInit, EventEmitter } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'browse-assets',
  templateUrl: './browse-assets.component.html',
  styleUrls: ['./browse-assets.component.scss']
})
export class BrowseAssetsComponent implements OnInit {

  constructor(
    private _assets: AssetService,
    private ss: SettingsService
  ) { }
  get assets(){return this._assets;}

  ngOnInit() {
    this.assets.pullAssets();
  }

  stringify(thing){
    return JSON.stringify(thing);
  }

}
