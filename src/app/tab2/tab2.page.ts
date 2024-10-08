import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  ionViewWillEnter() {
    console.log("Cargando datos de la Tierra...");
    // Lógica para cargar datos de la Tierra
  }
  

}
