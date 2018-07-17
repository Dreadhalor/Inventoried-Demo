import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  serial_number;
  category;
  status;

  constructor() { }

  ngOnInit() {
  }

  getAssetStatuses(){
    return Object.entries(AssetStatuses);
  }
  getAssetCategories(){
    return Object.entries(AssetCategories);
  }

  hello(){
    console.log(`${this.serial_number} ${this.category} ${this.status}`);
  }

}

enum AssetStatuses {
  New = 'New',
  Assigned = 'Assigned',
  Returned = 'Returned',
  Retired = 'Retired'
}
enum AssetCategories {
  Desktop = 'Desktop',
  Monitor = 'Monitor',
  Printer = 'Printer',
}
