import { UtilitiesService } from "../services/utilities.service";

export class SettingsEntry {
  
  constructor(
    private _uuid: string = UtilitiesService.uuid(),
    private _value: string
  ){}

  get uuid(){
    return this._uuid;
  }
  get value(){
    return this._value;
  }
}