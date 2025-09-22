import { Component } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {
  paypal: any;
  WINDOW: any = window;
  ngOnInit(): void {
    this.loadPaypalScript();
  }

  ngOnDestroy(): void {
    if (this.paypal) {
      this.paypal.Buttons().close();
    }
  }

  private loadPaypalScript(): void {
    const script = document.createElement('script');
    const currency = 'USD';
    script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=${currency}`;
    script.onload = () => {
      this.loadPaypalButtons();
    };
    document.body.appendChild(script);
  }

  private loadPaypalButtons(): void {
    const priceToPay = '10.00';
    
    this.paypal = this.WINDOW.paypal;
    this.paypal.Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: priceToPay
            }
          }]
        });
      },
      onApprove: (data:any, actions:any) => {
        return actions.order.capture().then((details:any) => {
          alert(`Transaction completed by ${details.payer.name.given_name}`);
        });
      },
      onError: (err:any) => {
        console.error('PayPal error:', err);
        alert('Something went wrong with the payment!');
      }
    }).render('#paypal-button-container');
  }
}

