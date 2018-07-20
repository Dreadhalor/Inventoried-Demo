import { Component } from '@angular/core';
import { Globals } from './globals';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = Globals.title;

  constructor(
    private _ss: SettingsService
  ){}
  get ss(){return this._ss;}
}
