import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user_params){
    user_params.uuid = UtilitiesService.uuid();
    return new Promise((resolve) => {
      this.http.post(
        Globals.request_prefix + 'users/register_user',
        user_params
      ).subscribe((res: any) => {
        if (res.success){
          resolve(res.result);
        }
        resolve(null);
      })
    });
  }
}
