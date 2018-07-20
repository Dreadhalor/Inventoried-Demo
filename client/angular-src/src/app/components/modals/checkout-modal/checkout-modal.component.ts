import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../services/settings.service';
import { AssetService } from '../../../services/asset.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  modal: NgbModalRef = null;
  options = {
    centered: true,
    beforeDismiss: () => {
      this.reset();
      return true;
    }
  };

  constructor(
    private ss: SettingsService,
    private assets: AssetService,
    private us: UserService,
    private ms: NgbModal
  ) { }

  @ViewChild('content') content: ElementRef;
  
  asset_uuid: string;
  user_uuid: string;
  start_date: any;
  due_date: any;
  duration: number;
  error_message: string;

  ngOnInit() {
  }

  open(asset_uuid,user_uuid){
    if (asset_uuid) this.asset_uuid = asset_uuid;
    if (user_uuid) this.user_uuid = user_uuid;
    this.show(this.content);
  }

  show(content) {
    this.modal = this.ms.open(content, this.options);
  }

  reset(){
    this.duration = null;
    this.error_message = null;
    this.user_uuid = null;
    this.asset_uuid = null;
  }

  dateSelected(event){
    let now = new Date()
    let today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.start_date = new Date(today.year, today.month, today.day);
    this.due_date = new Date(event.year, event.month, event.day);
    let milliseconds = this.due_date.getTime() - this.start_date.getTime();
    this.duration = milliseconds/(1000*60*60*24);
    if (this.duration < 0){
      this.duration = null;
      this.error_message = "Due date must be in the future."
    } else this.error_message = null;
  }

  onSubmit(){
    if (this.duration && this.asset_uuid && this.user_uuid){
      let params = {
        user_uuid: this.user_uuid,
        asset_uuid: this.asset_uuid,
        start_date: this.start_date,
        due_date: this.due_date
      };
      this.us.checkout(params);
      this.reset();
      this.modal.close();
      this.modal = null;
    }
  }

}
