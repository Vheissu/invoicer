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
        this.client = await this.dataService.getClientById(this.invoice.clientId);
        this.amounts = await this.dataService.getInvoiceAmounts(params.invoiceId);

        console.log(this.amounts);
    }
}
