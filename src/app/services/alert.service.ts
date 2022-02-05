import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastr: ToastrService) {}

  successMessage(message: string, title: string) {
    this.toastr.success(message, title, {
      toastClass: 'shadow-lg w-96 rounded-lg my-2',
      titleClass: 'bg-green-500 text-lg text-white rounded-t-lg py-3 px-4',
      messageClass:
        ' bg-green-400 text-white rounded-b-lg tracking-wide bg-gray-50 px-4 py-2',
    });
  }

  failureMessage(message: string, title: string) {
    this.toastr.success(message, title, {
      toastClass: 'shadow-lg w-96 rounded-lg my-2',
      titleClass: 'bg-red-500 text-lg text-white rounded-t-lg py-3 px-4',
      messageClass:
        ' bg-red-400 text-white rounded-b-lg tracking-wide  px-4 py-2',
    });
  }

  warningMessage(message: string, title: string) {
    this.toastr.success(message, title, {
      toastClass: 'shadow-lg w-96 rounded-lg my-2',
      titleClass: 'bg-yellow-500 text-lg text-white rounded-t-lg py-3 px-4',
      messageClass:
        ' bg-yellow-400 text-white rounded-b-lg tracking-wide  px-4 py-2',
    });
  }
}
