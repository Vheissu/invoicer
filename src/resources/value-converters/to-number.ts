import { valueConverter } from 'aurelia';

@valueConverter('toNumber')
export class ToNumber {
    fromView(val) {
        if (!val) {
            return val;
        }

        return parseFloat(val);
    }
}
