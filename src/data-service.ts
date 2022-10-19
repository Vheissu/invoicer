import { DI } from 'aurelia';

import { AppDatabase } from './database-definitions';
import { IInvoice, IInvoiceAmount, InvoiceStatus } from './database-interfaces';

export const IDataService = DI.createInterface<IDataService>('IDataService', x => x.singleton(DataService));
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDataService extends DataService {}

export class DataService {
    protected db: AppDatabase;

    constructor() {
        this.db = new AppDatabase();
    }

    async addInvoice(invoice: IInvoice) {
        return await this.db.invoices.add(invoice);
    }

    async updateInvoice(id: string, invoice: IInvoice) {
        return await this.db.invoices.update(parseInt(id), invoice);
    }

    async updateInvoiceStatus(id: string, status: InvoiceStatus) {
        return await this.db.invoices.update(parseInt(id), { status });
    }

    async deleteInvoice(id: string) {
        return await this.db.invoices.delete(parseInt(id));
    }

    async getInvoices(): Promise<IInvoice[]> {
        return await this.db.invoices.toArray();
    }

    async getInvoiceAmounts(id: string): Promise<IInvoiceAmount[]> {
        return await this.db.invoice_amounts.where('invoiceId').equals(parseInt(id)).toArray();
    }

    async getInvoiceById(id) {
        return await this.db.invoices.get(parseInt(id));
    }

    async getInvoiceDateRange(startDate, endDate) {
        return await this.db.invoices.where('date').between(startDate, endDate).toArray();
    }

    async getInvoicesByStatus(status) {
        return await this.db.invoices.where('status').equals(status).toArray();
    }

    async populateDb() {
        try {    
            await this.db.invoices.add({
                invoicee_name: 'John Doe',
                invoicee_address_line_1: '123 Main Street',
                invoicee_address_line_2: 'Apt 1',
                invoicee_city: 'New York',
                invoicee_country: 'USA',
                invoicee_postcode: '10001',
                invoicee_phone: '555-555-5555',
                invoicee_email: 'johndone@somecorp.com',
                invoicer_name: 'Some Corp',
                invoicer_address_line_1: '123 Main Street',
                invoicer_address_line_2: 'Apt 1',
                invoicer_city: 'New York',
                invoicer_country: 'USA',
                invoicer_postcode: '10001',
                invoicer_phone: '555-555-5555',
                invoicer_email: 'admin@somecorp.com',
                currency: 'USD',
                created: new Date(),
                date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                status: InvoiceStatus.Pending
            });

            await this.db.invoices.add({
                invoicee_name: 'Jane Doe',
                invoicee_address_line_1: '234 Main Street',
                invoicee_address_line_2: 'Suite 2',
                invoicee_city: 'California',
                invoicee_country: 'USA',
                invoicee_postcode: '90210',
                invoicee_phone: '555-555-5555',
                invoicee_email: 'janedoe@fakecorp.com',
                invoicer_name: 'Some Corp',
                invoicer_address_line_1: '123 Main Street',
                invoicer_address_line_2: 'Apt 1',
                invoicer_city: 'New York',
                invoicer_country: 'USA',
                invoicer_postcode: '10001',
                invoicer_phone: '555-555-5555',
                invoicer_email: 'admin@somecorp.com',
                currency: 'USD',
                created: new Date(),
                date: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                status: InvoiceStatus.Draft
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
