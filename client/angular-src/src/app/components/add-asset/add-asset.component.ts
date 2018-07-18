import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Asset } from '../../services/asset';
import { VariableService } from '../../services/variable.service';

@Component({
  selector: 'add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  serial_number: string;
  category: string = this.vs.AssetCategories[0];
  status: string = this.vs.AssetStatuses[0];

  constructor(
    private assets: AssetService,
    private us: UtilitiesService,
    private vs: VariableService
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
