import { UtilitiesService } from "../services/utilities.service";

export class Asset {
  
  constructor(
    private _uuid: string = UtilitiesService.uuid(),
    private _serial_number?: string, 
    private _category_uuid?: string,
    private _status_uuid?: string
  ){}

  get uuid(){
    return this._uuid;
  }
  get serial_number(){
    return this._serial_number;
  }
  set serial_number(val){
    this._serial_number = val;
  }
  get category_uuid(){
    return this._category_uuid;
  }
  set category_uuid(val){
    this._category_uuid = val;
  }
  get status_uuid(){
    return this._status_uuid;
  }
  set status_uuid(val){
    this._status_uuid = val;
  }
}