export interface IInvoice {
    id?: number;
    invoicee_name: string;
    invoicee_email?: string; 
    invoicee_address_line_1: string;
    invoicee_address_line_2: string;
    invoicee_city: string;
    invoicee_country: string;
    invoicee_postcode: string;
    invoicee_phone?: string;
    invoicer_name: string;
    invoicer_email?: string;
    invoicer_address_line_1: string;
    invoicer_address_line_2: string;
    invoicer_city: string;
    invoicer_country: string;
    invoicer_postcode: string;
    invoicer_phone?: string;
    invoice_number?: string;
    invoice_notes?: string;
    currency: string;
    created: Date;
    date: Date;
    status: InvoiceStatus;
    amounts?: IInvoiceAmount[];
}

export enum InvoiceStatus {
    Pending = 'pending',
    Paid = 'paid',
    Cancelled = 'cancelled',
    Refunded = 'refunded',
    Draft = 'draft'
}

export interface IInvoiceAmount {
    id?: number;
    invoiceId?: number;
    amount?: number;
    qty?: number;
    tax?: number;
    discount?: number;
    description?: string;
}
