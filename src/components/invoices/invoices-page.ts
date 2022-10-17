import { IDataService } from '../../data-service';

export class InvoicesPage {
    private invoices = [];

    constructor(@IDataService readonly dataService: IDataService) {}

    async binding() {
        this.invoices = await this.dataService.getInvoices();
        console.log(this.invoices);
    }
}
