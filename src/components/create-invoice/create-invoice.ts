import { IRouteableComponent } from '@aurelia/router';
import { IDataService } from '../../data-service';

export class CreateInvoice implements IRouteableComponent {
    private invoice = {
        invoicee_name: '',
        invoicee_address_line_1: '',
        invoicee_address_line_2: '',
        invoicee_city: '',
        invoicee_country: '',
        invoicee_postcode: '',
        invoicer_name: '',
        invoicer_address_line_1: '',
        invoicer_address_line_2: '',
        invoicer_city: '',
        invoicer_country: '',
        invoicer_postcode: '',
        paymentStatus: 'pending',
        currency: 'USD',
        due: new Date(),
        created: new Date(),
    };

    private invoice_amounts = [];

    constructor(@IDataService private dataService: IDataService) {
    }

    public createAmountRow() {
        this.invoice_amounts.push({
            description: '',
            amount: 0,
            qty: 0,
            invoice: null,
        });
    }
}
