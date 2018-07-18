import { Injectable } from '@angular/core';

import * as uuid from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  uuid(){
    return uuid();
  }
  
}
