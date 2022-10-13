import { valueConverter } from 'aurelia';

@valueConverter('currency')
export class CurrencyValueConverter {
    toView(value, config = {locale: 'en-US', currency: 'USD', displayBy: 'symbol'}) {
        if (!value) {
            return value;
        }

        const locale = config.locale || 'en-US';

        const props = {
            style: 'currency',
            currency: config.currency || 'USD',
            currencyDisplay: config.displayBy || 'symbol'
        };

        return parseFloat(value).toLocaleString(locale, props);
    }
}