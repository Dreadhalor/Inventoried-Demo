import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: any[] = [];
  public user_assets: any[] = [];

  constructor(
    private http: HttpClient
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
          this.pullUserInformation();
          resolve(res.result);
        }
        resolve(null);
      })
    });
  }
  logout(){
    localStorage.removeItem('token');
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
          resolve(res.result);
        }
        resolve(null);
      })
    });
  }

  pullUserInformation(){
    this.pullAssignedAssets();
  }

  pullAssignedAssets(){
    let token = localStorage.getItem('token');
    return new Promise((resolve) => {
      if (token){
        let headers = new HttpHeaders({
          authorization: token
        });
        this.http.get(
          Globals.request_prefix + 'users/pull_assigned_assets',
          { headers: headers }
        ).subscribe((res: any) => {
          if (res.success){
            this.user_assets = res.result;
            resolve(res.result);
          }
          resolve(null);
        })
      } else resolve(null);
    });
  }
}
