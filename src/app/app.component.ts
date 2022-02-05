import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private globalService: GlobalService) {
    this.globalService.onInitExecute();
  }

  ngOnInit(): void {}

  title = 'anish-garden-fea';
}
