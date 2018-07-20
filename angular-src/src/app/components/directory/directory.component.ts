import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  constructor(
    private _us: UserService
  ) { }
  get us(){return this._us;}

  ngOnInit() {
    this.us.pullUsers();
  }

}
