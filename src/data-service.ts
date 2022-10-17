import { DI } from 'aurelia';

import Dexie from 'dexie';

export const IDataService = DI.createInterface<IDataService>('IDataService', x => x.singleton(DataService));
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDataService extends DataService {}

interface IInvoice {
    id?: number;
    client: string;
    currency: string;
    created: Date;
    date: Date;
}

enum InvoiceStatus {
    Pending = 'pending',
    Paid = 'paid',
    Cancelled = 'cancelled',
    Refunded = 'refunded'
}

export class DataService {
    protected db;

    constructor() {
        this.db = new Dexie('freeinvoice');

        this.db.version(1).stores({
            invoices: `++id, client, currency, created, date, status`,
            invoice_amounts: `++id, invoiceId, amount, qty, tax, discount, description`,
            contacts: `++id, name, email, address_line_1, address_line_2, city, country, postcode, phone`,
            clients: `++id, name, address_line_1, address_line_2, city, country, postcode, email, phone`,
        });
    }

    async addInvoice(invoice: IInvoice) {
        return await this.db.invoices.add(invoice);
    }

    async addContact(contact: unknown) {
        return await this.db.contacts.add(contact);
    }

    async updateInvoice(id: string, invoice: IInvoice) {
        return await this.db.invoices.update(parseInt(id), invoice);
    }

    async updateContact(id: string, contact: unknown) {
        return await this.db.contacts.update(parseInt(id), contact);
    }

    async updateInvoiceStatus(id: string, status: InvoiceStatus) {
        return await this.db.invoices.update(parseInt(id), { status });
    }

    async deleteInvoice(id) {
        return await this.db.invoices.delete(parseInt(id));
    }

    async deleteContact(id) {
        return await this.db.contacts.delete(parseInt(id));
    }

    async getInvoices() {
        return await this.db.invoices.toArray();
    }

    async getInvoiceAmounts(id) {
        return await this.db.invoice_amounts.where('invoiceId').equals(parseInt(id)).toArray();
    }

    async getContacts() {
        return await this.db.contacts.toArray();
    }

    async getInvoiceById(id) {
        return await this.db.invoices.get(parseInt(id));
    }

    async getContactById(id) {
        return await this.db.contacts.get(parseInt(id));
    }

    async getClientById(id) {
        return await this.db.clients.get(parseInt(id));
    }

    async getInvoiceDateRange(startDate, endDate) {
        return await this.db.invoices.where('date').between(startDate, endDate).toArray();
    }

    async getInvoicesByStatus(status) {
        return await this.db.invoices.where('status').equals(status).toArray();
    }

    async populateDb() {
        try {
            await this.db.clients.add({
                name: 'ACME Corporation',
                address_line_1: '123 Main Street',
                address_line_2: 'Suite 100',
                city: 'Anytown',
                country: 'USA',
                postcode: '12345',
                email: 'acmecorp@acmecorp.com',
                phone: '123-456-7890',
            });

            await this.db.contacts.add({
                name: 'John Doe',
                email: 'johndoe@gmail.com', 
                phone: '+1-555-555-5555'
            });
    
            await this.db.invoices.add({
                client: 1,
                currency: 'USD',
                created: new Date(),
                date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                status: InvoiceStatus.Pending
            });
    
            await this.db.invoice_amounts.add({
                invoiceId: 1,
                amount: 100,
                qty: 10,
                tax: 10,
                discount: 0,
                description: 'Some work that I did'
            });
    
            await this.db.invoice_amounts.add({
                invoiceId: 1,
                amount: 100,
                qty: 10,
                tax: 0,
                discount: 0,
                description: 'Reimbursement for stationery costs'
            });
        } catch (e) {
            console.error(e);
        }
    }
}
