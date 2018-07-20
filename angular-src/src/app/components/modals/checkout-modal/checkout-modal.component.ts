import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../services/settings.service';
import { AssetService } from '../../../services/asset.service';
import { UserService } from '../../../services/user.service';

import * as moment from 'moment';

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
  check_out_date: moment.Moment;
  due_date: moment.Moment;
  duration: number;
  error_message: string;

  ngOnInit() {
  }

  open(event){
    let asset_uuid = event.asset_uuid;
    let user_uuid = event.user_uuid;
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
    let now = moment();
    this.check_out_date = moment({
      year: now.year(),
      month: now.month(),
      date: now.date()
    });
    this.due_date = moment({
      year: event.year,
      month: event.month - 1,
      date: event.day
    });
    this.duration = this.due_date.diff(this.check_out_date,'days');
    if (this.duration < 1){
      this.duration = null;
      this.error_message = "Due date must be in the future."
    } else this.error_message = null;
  }

  onSubmit(){
    if (this.duration && this.asset_uuid && this.user_uuid){
      let params = {
        user_uuid: this.user_uuid,
        asset_uuid: this.asset_uuid,
        check_out_date: this.check_out_date.format('MMMM Do YYYY'),
        due_date: this.due_date.format('MMMM Do YYYY')
      };
      this.us.checkout(params);
      this.reset();
      this.modal.close();
      this.modal = null;
    }
  }

}
