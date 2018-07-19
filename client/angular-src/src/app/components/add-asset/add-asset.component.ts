import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Asset } from '../../classes/asset';
import { SettingsService } from '../../services/settings.service';
import { SettingsEntry } from '../../classes/settings-entry';

@Component({
  selector: 'add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  serial_number: string;
  category: string = this.ss.asset_categories[0].uuid;
  status: string = this.ss.asset_statuses[0].uuid;

  constructor(
    private assets: AssetService,
    private us: UtilitiesService,
    private ss: SettingsService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    let asset = new Asset(
      undefined,
      this.serial_number,
      this.category,
      this.status
    );
    this.assets.addAsset(asset);
  }

}
