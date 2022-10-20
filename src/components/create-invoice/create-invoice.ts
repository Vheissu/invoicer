import { IRouteableComponent } from '@aurelia/router';
import { IDataService } from '../../data-service';
import { IInvoiceAmount, InvoiceStatus } from '../../database-interfaces';

export class CreateInvoice implements IRouteableComponent {
    private invoice = {
        invoicee_name: '',
        invoicee_email: '',
        invoicee_address_line_1: '',
        invoicee_address_line_2: '',
        invoicee_city: '',
        invoicee_country: '',
        invoicee_postcode: '',
        invoicee_phone: '',
        invoicer_name: '',
        invoicer_email: '',
        invoicer_address_line_1: '',
        invoicer_address_line_2: '',
        invoicer_city: '',
        invoicer_country: '',
        invoicer_postcode: '',
        invoicer_phone: '',
        status: InvoiceStatus.Pending,
        currency: 'USD',
        date: new Date(),
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
            tax: 0,
            discount: 0,
            invoice: null,
        });
    }

    async save() {
        const invoice = await this.dataService.addInvoice(this.invoice);

        for (const amount of this.invoice_amounts) {
            await this.dataService.addInvoiceAmount(invoice, amount.amount, amount.qty, amount.tax, amount.discount, amount.description);
        }

        console.log(invoice);
    }

    public calculateAmount(amount: string, qty: string, tax: string, discount: string) {
        const calculated = parseFloat(amount) * parseFloat(qty) - parseFloat(discount);
        const taxAmount = (calculated / 100) * parseFloat(tax);
        const total = calculated + taxAmount;

        return !isNaN(total) ? total : 0;
    }

    public currencyCheck(e) {
        if (e.target.value.trim() === '') {
            e.target.value = 0;
        }

        return true;
    }
}
