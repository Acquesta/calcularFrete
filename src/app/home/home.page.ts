import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { identity } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(public ToastController: ToastController) {}

  async exibirToast(frete: any) {
    const toast = await this.ToastController.create({
      message: "O seu frete normal é: R$" + frete,
      duration: 2000,
    });
    toast.present();
  }

  administrador = true;
  distancia: any = "";
  peso: any = "";
  quantidade: any = "";
  tipo: any = "";
  frete: any = "";
  entrega: any = {
    express: 0.1,
    agendada: 0.2,
  };
  desconto: any = {
    ate3: 0.1,
    ate5: 0.15,
    ate10: 0.2,
    acimaDe11: 0.25,
  };

  km = 1.0;
  kg = 0.5;

  calcular() {
    this.entrega = {
      express: 0.1,
      agendada: 0.2,
    };

    if(this.peso <= 1){
      this.kg = 0.2
    }else if(this.peso >= 2 && this.peso <= 5){
      this.kg = 0.3
    }else if(this.peso >= 6 && this.peso <= 10){
      this.kg = 0.4
    }else if(this.peso >= 11 && this.peso <= 15){
      this.kg = 0.5
    }else{
      this.kg = 0.6
    }

    if(this.distancia >= 100 && this.distancia <= 500){
      this.km = 0.15
    }else if(this.distancia >= 501 ){
      this.km = 0.12
    }

    this.frete = this.km * this.distancia + this.kg * this.peso;

    // this.frete = parseFloat(this.frete)

    if (this.quantidade <= 3) {
      this.frete = this.frete - this.frete * this.desconto.ate3;
    } else if (this.quantidade >= 4 && this.quantidade <= 5) {
      this.frete = this.frete - this.frete * this.desconto.ate5;
    } else if (this.quantidade >= 6 && this.quantidade <= 10) {
      this.frete = this.frete - this.frete * this.desconto.ate10;
    } else if (this.quantidade >= 11) {
      this.frete = this.frete - this.frete * this.desconto.acimaDe11;
    }

    this.entrega.express = this.frete + this.frete * this.entrega.express;
    this.entrega.agendada = this.frete + this.frete * this.entrega.agendada;

    this.exibirToast(this.frete);
  }

}
