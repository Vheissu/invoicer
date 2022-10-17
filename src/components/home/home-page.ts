import { IDataService } from '../../data-service';

export class HomePage {
    constructor(@IDataService private dataService: IDataService) {}

    async attached() {
        //this.dataService.populateDb();
    }
}
