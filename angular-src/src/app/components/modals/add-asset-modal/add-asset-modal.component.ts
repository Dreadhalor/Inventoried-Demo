import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AssetService } from '../../../services/asset.service';
import { UtilitiesService } from '../../../services/utilities.service';
import { SettingsService } from '../../../services/settings.service';
import { Asset } from '../../../classes/asset';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-asset-modal',
  templateUrl: './add-asset-modal.component.html',
  styleUrls: ['./add-asset-modal.component.scss']
})
export class AddAssetModalComponent implements OnInit {

  serial_number: string;
  category: string = this.ss.asset_categories[0].uuid;
  status: string = this.ss.asset_statuses[0].uuid;

  modal: NgbModalRef = null;
  options = {
    centered: true,
    beforeDismiss: () => {
      this.reset();
      return true;
    }
  };

  constructor(
    private assets: AssetService,
    private us: UtilitiesService,
    private ss: SettingsService,
    private ms: NgbModal
  ) { }

  @ViewChild('content') content: ElementRef;
  
  ngOnInit() {
  }

  reset(){
    this.serial_number = '';
    this.category = this.ss.asset_categories[0].uuid;
    this.status = this.ss.asset_statuses[0].uuid;
  }

  open(asset){
    this.show(this.content);
  }

  show(content) {
    this.modal = this.ms.open(content, this.options);
  }

  onSubmit(){
    let asset = new Asset(
      undefined,
      this.serial_number,
      this.category,
      this.status
    );
    this.assets.addAsset(asset);
    this.reset();
    this.modal.close();
    this.modal = null;
  }

}