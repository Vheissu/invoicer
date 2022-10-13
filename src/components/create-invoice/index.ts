import { IRouteableComponent } from '@aurelia/router';
import { IDataService } from '../../data-service';

export class CreateInvoiceComponent implements IRouteableComponent {
    private invoice = {
        clientName: '',
        paymentStatus: 'pending',
        currency: 'USD',
        due: new Date(),
        created: new Date(),
    };

    constructor(@IDataService private dataService: IDataService) {
    }
}