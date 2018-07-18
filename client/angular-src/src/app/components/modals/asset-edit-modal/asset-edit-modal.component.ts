import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Asset } from '../../../classes/asset';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'asset-edit-modal',
  templateUrl: './asset-edit-modal.component.html',
  styleUrls: ['./asset-edit-modal.component.scss']
})
export class AssetEditModalComponent implements OnInit {

  asset: Asset;

  values = {
    serial_number: null,
    category: null,
    status: null
  }
  

  modal: NgbModalRef = null;
  options = { centered: true };

  constructor(
    private ss: SettingsService,
    private ms: NgbModal
  ) { }

  @ViewChild('content') content: ElementRef;

  ngOnInit() {
  }

  open(asset){
    this.asset = asset;
    this.values.serial_number = this.asset.serial_number;
    this.values.category = this.asset.category;
    this.values.status = this.asset.status;
    this.show(this.content);
  }

  show(content) {
    this.modal = this.ms.open(content, this.options);
  }

  onSubmit(){
    this.modal.close();
    this.modal = null;

  }

}
