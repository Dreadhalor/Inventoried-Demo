import { Component } from '@angular/core';
import { Globals } from './globals';
import { VariableService } from './services/variable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = Globals.title;

  constructor(
    private vs: VariableService
  ){}
}
