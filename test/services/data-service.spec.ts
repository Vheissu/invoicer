import { DataService } from '../../src/data-service';

describe('Data Service', () => {

    let dataService: DataService;

    beforeEach(() => {
        dataService = new DataService();
    });

    test('should be created', () => {
        expect(dataService).toBeTruthy();
    });

    test('should get invoices', async () =>{
        await dataService.populateDb();

        const invoices = await dataService.getInvoices();
        expect(invoices.length).toBe(1);
    });


});