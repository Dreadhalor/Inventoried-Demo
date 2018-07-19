import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { SettingsEntry } from '../classes/settings-entry';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  loaded = false;

  asset_categories: SettingsEntry[] = [];
  asset_statuses: SettingsEntry[] = [];

  constructor(
    private http: HttpClient
  ) {
    http.get(
      Globals.request_prefix + Globals.settings_route
    ).subscribe((res: any) => {
      if (res.success){
        this.asset_categories = res.result.asset_categories;
        this.asset_statuses = res.result.asset_statuses;
      }
      this.loaded = true;
    })
  }

  addAssetCategory = (category: SettingsEntry) => {
    let body = {
      uuid: category.uuid,
      value: category.value
    };
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'settings/add_asset_category',
        body
      ).subscribe((res: any) => {
        if (res.success){
          this.asset_categories = res.result.asset_categories;
          resolve(this.asset_categories);
        }
        resolve(null);
      })
    });
  }
  deleteAssetCategory(uuid){
    let body = {
      uuid: uuid
    };
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'settings/delete_asset_category',
        body
      ).subscribe((res: any) => {
        if (res.success){
          this.asset_categories = res.result.asset_categories;
          resolve(this.asset_categories);
        }
        resolve(null);
      })
    });
  }
  setAssetCategories(categories_arg: SettingsEntry[]){
    let categories = Globals.deepCopy(categories_arg);
    let body = {
      categories: []
    };
    categories.forEach(category => body.categories.push(category));
    this.http.post(
      Globals.request_prefix + 'settings/set_asset_categories',
      body
    ).subscribe((res: any) => {
      if (res.success){
        this.asset_categories = res.result.asset_categories;
        return true;
      }
      return false;
    })
  }
  getAssetCategory(uuid){
    for (let i = 0; i < this.asset_categories.length; i++){
      if (this.asset_categories[i].uuid == uuid) return this.asset_categories[i];
    }
    return null;
  }

  addAssetStatus = (status: SettingsEntry) => {
    let body = {
      uuid: status.uuid,
      value: status.value
    };
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'settings/add_asset_status',
        body
      ).subscribe((res: any) => {
        if (res.success){
          this.asset_statuses = res.result.asset_statuses;
          resolve(this.asset_statuses);
        }
        resolve(null);
      })
    });
  }
  deleteAssetStatus(uuid){
    let body = {
      uuid: uuid
    };
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'settings/delete_asset_status',
        body
      ).subscribe((res: any) => {
        if (res.success){
          this.asset_statuses = res.result.asset_statuses;
          resolve(this.asset_statuses);
        }
        resolve(null);
      })
    });
  }
  setAssetStatuses(statuses_arg: SettingsEntry[]){
    let statuses = Globals.deepCopy(statuses_arg);
    let body = {
      statuses: []
    };
    statuses.forEach(status => body.statuses.push(status));
    this.http.post(
      Globals.request_prefix + 'settings/set_asset_statuses',
      body
    ).subscribe((res: any) => {
      if (res.success){
        this.asset_statuses = res.result.asset_statuses;
        return true;
      }
      return false;
    })
  }
  getAssetStatus(uuid){
    for (let i = 0; i < this.asset_statuses.length; i++){
      if (this.asset_statuses[i].uuid == uuid) return this.asset_statuses[i];
    }
    return null;
  }
}
