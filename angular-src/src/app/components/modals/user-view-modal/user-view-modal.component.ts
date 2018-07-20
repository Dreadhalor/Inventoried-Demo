import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../services/settings.service';
import { AssetService } from '../../../services/asset.service';

@Component({
  selector: 'user-view-modal',
  templateUrl: './user-view-modal.component.html',
  styleUrls: ['./user-view-modal.component.scss']
})
export class UserViewModalComponent implements OnInit {

  user: any;

  modal: NgbModalRef = null;
  options = {
    centered: true,
    beforeDismiss: () => {
      return true;
    }
  };

  constructor(
    private ss: SettingsService,
    private assets: AssetService,
    private ms: NgbModal
  ) { }

  @ViewChild('content') content: ElementRef;

  @Output() open_checkout = new EventEmitter<any>();

  ngOnInit() {
  }

  save(){
  }

  open(user){
    this.user = user;
    this.show(this.content);
  }

  show(content) {
    this.modal = this.ms.open(content, this.options);
  }

  checkoutButtonPressed(){
    this.modal.close();
    this.modal = null;
    this.open_checkout.emit({
      user_uuid: this.user.uuid
    });
  }

}

enum assetModalState {
  default = 0,
  editing = 1
}