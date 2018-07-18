import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { AssetCategory } from '../classes/asset-category';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  asset_categories: AssetCategory[] = [];
  asset_statuses: string[] = [];

  constructor(
    private http: HttpClient
  ) {
    http.get(
      Globals.request_prefix + Globals.settings_route
    ).subscribe((res: any) => {
      console.log(res);
      console.log(res.result[0].asset_categories);
      this.asset_categories = res.result[0].asset_categories;
      this.asset_statuses = res.result[0].asset_statuses;
      //console.log(this.asset_categories);
    })
  }

  addAssetCategory(category: AssetCategory){
    let body = {
      uuid: category.uuid,
      value: category.value
    };
    this.http.post(
      Globals.request_prefix + 'settings/add_asset_category',
      body
    ).subscribe((res: any) => {
      if (res.success){
        console.log('category added!');
        this.asset_categories.push(category);
      }
    })
  }
}
