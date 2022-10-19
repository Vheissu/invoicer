import { Dexie } from 'dexie';
import { IInvoice, IInvoiceAmount } from './database-interfaces';

export class AppDatabase extends Dexie {
    invoices!: Dexie.Table<IInvoice, number>;
    invoice_amounts!: Dexie.Table<IInvoiceAmount, number>;

    constructor() {
        super('freeinvoice');

        this.version(1).stores({
            invoices: `
                ++id, 
                client, 
                invoicee_name, 
                invoicee_email, 
                invoicee_address_line_1, 
                invoicee_address_line_2, 
                invoicee_city, 
                invoicee_country, 
                invoicee_postcode, 
                invoicee_phone, 
                invoicer_name,
                invoicer_email,
                invoicer_address_line_1,
                invoicer_address_line_2,
                invoicer_city,
                invoicer_country,
                invoicer_postcode,
                invoicer_phone,
                currency, 
                created, 
                date, 
                status`,
            invoice_amounts: `++id, invoiceId, amount, qty, tax, discount, description`,
        });
    }
}
