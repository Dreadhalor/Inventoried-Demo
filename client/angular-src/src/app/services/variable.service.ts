import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private _AssetCategories: string[];
  get AssetCategories(){
    return this._AssetCategories;
  }
  set AssetCategories(val){
    this._AssetCategories = val;
  }

  private  _AssetStatuses: string[];
  get AssetStatuses(){
    return this._AssetStatuses;
  }
  set AssetStatuses(val){
    this._AssetStatuses = val;
  }

  constructor(
    http: HttpClient
  ) {
    http.get(
      Globals.request_prefix + 
      Globals.server_vars_route
    ).subscribe((res) => {
      let res_any = res as any;
      this.AssetCategories = res_any.asset_categories;
      this.AssetStatuses = res_any.asset_statuses;
    })
  }

  get loaded(){
    return this.AssetCategories &&
      this.AssetStatuses;
  }

}
