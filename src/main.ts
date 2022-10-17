import { CurrencyValueConverter } from './resources/value-converters/currency-converter';
import { RouterConfiguration } from '@aurelia/router';
import Aurelia from 'aurelia';
import { MyApp } from './my-app';

Aurelia.register(
    RouterConfiguration.customize({ useUrlFragmentHash: false }),
    CurrencyValueConverter
)
    .app(MyApp)
    .start();
