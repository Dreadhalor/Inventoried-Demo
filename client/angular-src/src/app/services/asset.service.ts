import { Injectable } from '@angular/core';
import { Asset } from './asset';
import { UtilitiesService } from './utilities.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  public assets: any[] = [];

  constructor(
    private us: UtilitiesService,
    private vs: VariableService,
    private http: HttpClient
  ) {
    this.pullAssets();
  }

  addAsset(asset: Asset){
    let params = {
      uuid: asset.uuid,
      serial_number: asset.serial_number,
      category: asset.category,
      status: asset.status
    };
    this.http.post(
      Globals.request_prefix + 'assets/add-asset',
      params
    ).subscribe(
      res => {
      },
      err => {
        console.log(err);
    })
  }

  pullAssets(){
    this.http.get(
      Globals.request_prefix + 'assets/pull-assets',
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
