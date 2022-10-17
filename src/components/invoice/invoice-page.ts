import { IRouteableComponent } from '@aurelia/router';
import { IDataService } from '../../data-service';

export class InvoicePage implements IRouteableComponent {
    private invoice;
    private client;
    private amounts = [];

    constructor(@IDataService private dataService: IDataService) {
    }

    async loading(params: { invoiceId: number }) {
        this.invoice = await this.dataService.getInvoiceById(params.invoiceId);
        this.client = await this.dataService.getClientById(this.invoice.client);
        this.amounts = await this.dataService.getInvoiceAmounts(params.invoiceId);

        console.log(`Invoice`, this.invoice);
        console.log(`Client`, this.client);
        console.log(`Amounts`, this.amounts);
    }
}
