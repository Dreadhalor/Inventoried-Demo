import { UtilitiesService } from "../services/utilities.service";

export class Asset {
  
  constructor(
    private _uuid: string = UtilitiesService.uuid(),
    private _serial_number?: string, 
    private _category?: string,
    private _status?: string
  ){}

  get uuid(){
    return this._uuid;
  }
  get serial_number(){
    return this._serial_number;
  }
  get category(){
    return this._category;
  }
  get status(){
    return this._status;
  }
}