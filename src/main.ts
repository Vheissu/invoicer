import { CurrencyValueConverter } from './resources/value-converters/currency-converter';
import { RouterConfiguration } from '@aurelia/router';
import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import { ToNumber } from './resources/value-converters/to-number';

Aurelia.register(
    RouterConfiguration.customize({ useUrlFragmentHash: false }),
    CurrencyValueConverter,
    ToNumber
)
    .app(MyApp)
    .start();
