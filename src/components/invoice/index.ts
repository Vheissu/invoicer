import { IRouteableComponent } from '@aurelia/router';
import { IDataService } from '../../data-service';

export class InvoiceComponent implements IRouteableComponent {
    private invoice;

    constructor(@IDataService private dataService: IDataService) {
    }

    async load(params: { id: number }) {
        this.invoice = await this.dataService.getInvoiceById(params.id);
    }
}