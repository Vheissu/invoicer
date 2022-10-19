import { IInvoice } from './../../database-interfaces';
import { IDataService } from '../../data-service';

export class InvoicesPage {
    private invoices: IInvoice[] = [];

    constructor(@IDataService readonly dataService: IDataService) {}

    async binding() {
        this.invoices = await this.dataService.getInvoices();

        for (const invoice of this.invoices) {
            invoice.amounts = await this.dataService.getInvoiceAmounts(invoice.id as unknown as string);
        }
    }
}
