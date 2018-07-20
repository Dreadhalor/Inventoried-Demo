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
    private assets: AssetService,
    private ss: SettingsService
  ) { }

  ngOnInit() {
    this.assets.pullAssets();
  }

}
