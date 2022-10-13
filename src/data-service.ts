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
            invoices: `++id, date, status`,
            contacts: `++id, name, email, phone`
        });
    }

    async addInvoice(invoice: IInvoice) {
        return await this.db.invoices.add(invoice);
    }

    async addContact(contact: unknown) {
        return await this.db.contacts.add(contact);
    }

    async updateInvoice(id: number, invoice: IInvoice) {
        return await this.db.invoices.update(id, invoice);
    }

    async updateContact(id: number, contact: unknown) {
        return await this.db.contacts.update(id, contact);
    }

    async updateInvoiceStatus(id: number, status: InvoiceStatus) {
        return await this.db.invoices.update(id, { status });
    }

    async deleteInvoice(id) {
        return await this.db.invoices.delete(id);
    }

    async deleteContact(id) {
        return await this.db.contacts.delete(id);
    }

    async getInvoices() {
        return await this.db.invoices.toArray();
    }

    async getContacts() {
        return await this.db.contacts.toArray();
    }

    async getInvoiceById(id) {
        return await this.db.invoices.get(id);
    }

    async getContactById(id) {
        return await this.db.contacts.get(id);
    }

    async getInvoiceDateRange(startDate, endDate) {
        return await this.db.invoices.where('date').between(startDate, endDate).toArray();
    }

    async getInvoicesByStatus(status) {
        return await this.db.invoices.where('status').equals(status).toArray();
    }

    async populateDb() {
        await this.db.contacts.add({
            name: 'John Doe',
            email: 'johndoe@gmail.com', 
            phone: '+1-555-555-5555'
        });

        await this.db.invoices.add({
            client: 'John Doe',
            currency: 'USD',
            created: new Date(),
            date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            status: InvoiceStatus.Pending
        });
    }
}