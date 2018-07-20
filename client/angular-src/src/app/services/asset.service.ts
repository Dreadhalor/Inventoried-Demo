import { Injectable } from '@angular/core';
import { Asset } from '../classes/asset';
import { UtilitiesService } from './utilities.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  public assets: any[] = [];

  constructor(
    private us: UtilitiesService,
    private ss: SettingsService,
    private http: HttpClient
  ) {
    this.pullAssets();
  }

  addAsset(asset: Asset){
    let params = {
      uuid: asset.uuid,
      serial_number: asset.serial_number.toUpperCase(),
      category_uuid: asset.category_uuid,
      status_uuid: asset.status_uuid
    };
    this.http.post(
      Globals.request_prefix + 'assets/add_asset',
      params
    ).subscribe(
      (res: any) => {
        if (res.success){
          this.pullAssets();
        }
      },
      err => {
        console.log(err);
    })
  }
  saveAsset(asset: Asset){
    let params = {
      uuid: asset.uuid,
      serial_number: asset.serial_number,
      category_uuid: asset.category_uuid,
      status_uuid: asset.status_uuid
    };
    this.http.post(
      Globals.request_prefix + 'assets/edit_asset',
      params
    ).subscribe(
      (res: any) => {
        if (res.success){
          this.pullAssets();
        }
      },
      err => {
        console.log(err);
    })
  }
  checkin(uuid){
    let params = {
      uuid: uuid
    };
    this.http.post(
      Globals.request_prefix + 'assets/checkin',
      params
    ).subscribe(
      (res: any) => {
        if (res.success){
          let asset: Asset = this.getAsset(uuid);
          let available = this.ss.getAvailableUUID();
          if (available){
            asset.status_uuid = available;
            this.saveAsset(asset);
          }
          this.pullAssets();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  pullAssets(){
    this.http.get(
      Globals.request_prefix + 'assets/pull_assets'
    ).subscribe(
      (res: any) => {
        if (res.success){
          this.assets = res.result;
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  getAsset(uuid){
    for (let i = 0; i < this.assets.length; i++){
      if (this.assets[i].uuid == uuid) return this.assets[i];
    }
    return null;
  }

}
