import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Asset } from '../../../classes/asset';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../services/settings.service';
import { Globals } from '../../../globals';
import { AssetService } from '../../../services/asset.service';

@Component({
  selector: 'asset-edit-modal',
  templateUrl: './asset-edit-modal.component.html',
  styleUrls: ['./asset-edit-modal.component.scss']
})
export class AssetEditModalComponent implements OnInit {

  asset: Asset;

  values = {
    serial_number: null,
    category_uuid: null,
    status_uuid: null
  }
  

  modal: NgbModalRef = null;
  options = { centered: true };

  constructor(
    private ss: SettingsService,
    private assets: AssetService,
    private ms: NgbModal
  ) { }

  @ViewChild('content') content: ElementRef;

  ngOnInit() {
  }

  open(asset){
    this.asset = asset;
    this.values.serial_number = this.asset.serial_number;
    this.values.category_uuid = this.asset.category_uuid;
    this.values.status_uuid = this.asset.status_uuid;
    this.show(this.content);
  }

  show(content) {
    this.modal = this.ms.open(content, this.options);
  }

  onSubmit(){
    let result = Globals.deepCopy(this.asset);
    result.serial_number = this.values.serial_number;
    result.category_uuid = this.values.category_uuid;
    result.status_uuid = this.values.status_uuid;
    this.assets.saveAsset(result);
    this.modal.close();
    this.modal = null;

  }

}
