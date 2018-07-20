import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';
import { AssetService } from './asset.service';
import { Asset } from '../classes/asset';
import { SettingsService } from './settings.service';
import { AssetStatus } from '../classes/asset-status';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: any[] = [];
  public user;

  constructor(
    private http: HttpClient,
    private assets: AssetService,
    private ss: SettingsService
  ) { 
    this.pullUsers();
   }

  pullUsers(){
    this.http.get(
      Globals.request_prefix + 'users/pull_all',
    ).subscribe(
      res => {
        let any_res = res as any;
        if (any_res.success){
          this.users = any_res.result;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  registerUser(user_params){
    user_params.uuid = UtilitiesService.uuid();
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'users/register',
        user_params
      ).subscribe((res: any) => {
        if (res.success){
          this.pullUsers();
          resolve(res.result);
        }
        resolve(null);
      })
    });
  }
  login(user_params){
    user_params.uuid = UtilitiesService.uuid();
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'users/login',
        user_params
      ).subscribe((res: any) => {
        if (res.success){
          localStorage.setItem('token',res.result);
          this.pullUser().then(() => {
            resolve(res.result);
          })
        } else resolve(null);
      })
    });
  }
  logout(){
    localStorage.removeItem('token');
    return this.pullUser();
  }
  getUser(uuid){
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].uuid == uuid) return this.users[i];
    }
    return null;
  }

  checkout(params){
    let user_params = {
      user_uuid: params.user_uuid,
      asset_uuid: params.asset_uuid,
      check_out_date: params.check_out_date,
      due_date: params.due_date
    };
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'users/checkout',
        user_params
      ).subscribe((res: any) => {
        if (res.success){
          let asset: Asset = this.assets.getAsset(user_params.asset_uuid);
          let checked_out = this.ss.getCbeckedOutUUID();
          if (checked_out){
            asset.status_uuid = checked_out;
            this.assets.saveAsset(asset);
            this.pullUsers();
          }
          resolve(res.result);
        }
        resolve(null);
      })
    });
  }

  pullUser(){
    let token = localStorage.getItem('token');
    return new Promise(resolve => {
      if (token){
        let headers = new HttpHeaders({authorization:token});
        this.http.get(
          Globals.request_prefix + 'users/get_user',
          {headers: headers}
        ).subscribe((res: any) => {
          if (res.success){
            this.user = res.result;
            resolve(this.user);
          } else {
            this.user = null;
            resolve(this.user);
          }
        })
      } else {
        this.user = null;
        resolve(this.user);
      }
    })
  }

}
