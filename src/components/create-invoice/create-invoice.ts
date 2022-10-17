import { IRouteableComponent } from '@aurelia/router';
import { IHydratedController } from '@aurelia/runtime-html';
import { LifecycleFlags } from 'aurelia';
import { IDataService } from '../../data-service';
import { watch } from '@aurelia/runtime-html';

export class CreateInvoice implements IRouteableComponent {
    private invoice = {
        clientName: '',
        paymentStatus: 'pending',
        currency: 'USD',
        due: new Date(),
        created: new Date(),
    };

    private invoice_amounts = [];
    private clients = [];
    private contacts = [];
    private selectedClient = '';

    constructor(@IDataService private dataService: IDataService) {
    }

    async bound() {
        this.clients = await this.dataService.getClients();
        console.log(this.clients);
    }

    public createAmountRow() {
        this.invoice_amounts.push({
            description: '',
            amount: 0,
            qty: 0,
            invoice: null,
        });
    }

    @watch('selectedClient')
    async selectedClientChanged(newVal) {
        this.contacts = await this.dataService.getContactsByClientId(newVal);
    }
}
