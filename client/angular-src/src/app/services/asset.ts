import { UtilitiesService } from "./utilities.service";

export class Asset {
  private static us = new UtilitiesService;
  
  constructor(
    private _uuid: string = Asset.us.uuid(),
    private _serial_number?: string, 
    private _category?: string,
    private _status?: string){}

  get uuid(){
    return this._uuid;
  }
  set uuid(gen_uuid: string){
    this._uuid = gen_uuid;
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