import { valueConverter } from 'aurelia';

@valueConverter('truncate')
export class TruncateValueConverter {
    toView(value, length = 10) {
        return value.length > length ? value.substring(0, length) + '...' : value;
    }
}