import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async present(
    message: string,
    duration: number = 2000,
    color: 'success' | 'danger' | 'warning' = 'danger'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top',
      color,
    });
    await toast.present();
  }
}
