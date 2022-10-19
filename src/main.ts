import { CurrencyValueConverter } from './resources/value-converters/currency-converter';
import { RouterConfiguration } from '@aurelia/router';
import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import { ToNumber } from './resources/value-converters/to-number';
import { DateConverter } from './resources/value-converters/date-convert';

Aurelia.register(
    RouterConfiguration.customize({ useUrlFragmentHash: false }),
    CurrencyValueConverter,
    ToNumber,
    DateConverter
)
    .app(MyApp)
    .start();
