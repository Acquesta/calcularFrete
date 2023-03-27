import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public ToastController: ToastController) {}

  async exibirToast(frete: any){
    const toast = await this.ToastController.create({
      message: "O seu frete normal é: R$" + frete,
      duration: 2000
    })
    toast.present();
  }

  distancia: any = '';
  peso: any = '';
  quantidade: any = '';
  tipo: any = '';
  frete: any = '';
  entrega: any = {
    express: 0.1,
    agendada: 0.2
  };
  desconto: any = {
    ate3: 0.1,
    ate5: 0.15,
    ate10: 0.2,
    acimaDe11: 0.25
  }

  km = 2.5;
  kg = 1.2;

  calcular() {
    this.entrega = {
      express: 0.1,
      agendada: 0.2
    };

    this.frete = this.km * this.distancia + this.kg * this.peso;

    if(this.quantidade <= 3){
      this.frete = this.frete - (this.frete * this.desconto.ate3)
    }else if(this.quantidade >= 4 && this.quantidade <= 5 ){
      this.frete = this.frete - (this.frete * this.desconto.ate5)
    }else if(this.quantidade >= 6 && this.quantidade <= 10 ){
      this.frete = this.frete - (this.frete * this.desconto.ate10)
    }else if(this.quantidade >= 11){
      this.frete = this.frete - (this.frete * this.desconto.acimaDe11)
    }

    this.entrega.express =parseFloat( this.frete + (this.frete * this.entrega.express))
    this.entrega.agendada = parseFloat(this.frete + (this.frete * this.entrega.agendada))


    this.exibirToast(this.frete);
  }
}
