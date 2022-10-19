import { IRouteableComponent } from '@aurelia/router';
import { IDataService } from '../../data-service';

export class InvoicePage implements IRouteableComponent {
    private invoice;
    private amounts = [];

    constructor(@IDataService private dataService: IDataService) {
    }

    async loading(params: { invoiceId: string }) {
        this.invoice = await this.dataService.getInvoiceById(params.invoiceId);
        this.amounts = await this.dataService.getInvoiceAmounts(params.invoiceId);

        console.log(`Invoice`, this.invoice);
        console.log(`Amounts`, this.amounts);
    }
}
