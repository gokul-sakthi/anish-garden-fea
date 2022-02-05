import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(private globalS: GlobalService) {}

  ngOnInit(): void {
    this.globalS.showPopUp.subscribe((response: string) => {
      if (response === 'show') this.showPopUpAlert();
      else if (response === 'closemanual') this.closePopUpManually();
    });
  }

  @Input()
  message: string = '';

  @Input()
  showTime: number = 2000;

  @Input()
  type: 'success' | 'warning' | 'danger' = 'success';

  showPopUp: boolean = false;
  timeoutVar: any;

  showPopUpAlert() {
    this.showPopUp = true;
    this.timeoutVar = setTimeout(() => {
      this.timeoutVar = undefined;
      this.showPopUp = false;
    }, this.showTime);
  }

  closePopUpManually() {
    clearTimeout(this.timeoutVar);
    this.timeoutVar = undefined;
    this.showPopUp = false;
  }
}
