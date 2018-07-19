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
      serial_number: asset.serial_number,
      category_uuid: asset.category_uuid,
      status_uuid: asset.status_uuid
    };
    this.http.post(
      Globals.request_prefix + 'assets/add_asset',
      params
    ).subscribe(
      res => {
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
      res => {
        this.pullAssets();
      },
      err => {
        console.log(err);
    })
  }

  pullAssets(){
    this.http.get(
      Globals.request_prefix + 'assets/pull_assets',
    ).subscribe(
      res => {
        let any_res = res as any;
        if (any_res.success){
          this.assets = any_res.result;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
