import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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
  options = {
    centered: true,
    beforeDismiss: () => {
      this.reset(false);
      return true;
    }
  };

  constructor(
    private ss: SettingsService,
    private assets: AssetService,
    private ms: NgbModal
  ) { }

  @ViewChild('content') content: ElementRef;

  @Output() open_checkout = new EventEmitter<string>();

  state: assetModalState = assetModalState.default;

  ngOnInit() {
  }

  reset(reload: boolean){
    if (reload){
      this.values = {
        serial_number: this.asset.serial_number,
        category_uuid: this.asset.category_uuid,
        status_uuid: this.asset.status_uuid
      }
    } else {
      this.values = {
        serial_number: null,
        category_uuid: null,
        status_uuid: null
      }
    }
    this.state = assetModalState.default;
  }
  save(){
    this.asset.serial_number = this.values.serial_number;
    this.asset.category_uuid = this.values.category_uuid;
    this.asset.status_uuid = this.values.status_uuid;
    this.assets.saveAsset(this.asset);
  }

  open(asset){
    this.asset = asset;
    this.values = {
      serial_number: this.asset.serial_number,
      category_uuid: this.asset.category_uuid,
      status_uuid: this.asset.status_uuid
    }
    this.show(this.content);
  }

  show(content) {
    this.modal = this.ms.open(content, this.options);
  }

  onSubmit(){
    this.reset(false);
    this.modal.close();
    this.modal = null;
  }

  editButtonPressed(){
    this.state = assetModalState.editing;
  }
  cancelButtonPressed(){
    this.state = assetModalState.default;
    this.reset(true);
  }
  saveButtonPressed(){
    this.save();
    this.state = assetModalState.default;
  }
  checkoutButtonPressed(){
    this.reset(false);
    this.modal.close();
    this.modal = null;
    this.open_checkout.emit(this.asset.uuid);
  }

  get default(){
    return this.state == assetModalState.default;
  }
  get editing(){
    return this.state == assetModalState.editing;
  }

}

enum assetModalState {
  default = 0,
  editing = 1
}