import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AssetCategory } from '../../classes/asset-category';

@Component({
  selector: 'settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss']
})
export class SettingsViewComponent implements OnInit {

  adding_category = false;
  category_to_add = '';

  @ViewChild('category') category: ElementRef;

  constructor(
    private ss: SettingsService
  ) { }

  ngOnInit() {
  }

  addingCategoryButtonClicked(){
    this.adding_category = true;
    setTimeout(() => {this.category.nativeElement.focus()},0);
  }
  cancelAddingCategoryButtonClicked(){
    this.adding_category = false;
  }
  addCategoryConfirmButtonClicked(){
    let category = new AssetCategory(undefined,this.category_to_add);
    this.ss.addAssetCategory(category);
  }

}
