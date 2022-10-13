import { CurrencyValueConverter } from './../../src/resources/value-converters/currency-converter';
import { createFixture, setPlatform } from '@aurelia/testing';
import { BrowserPlatform } from '@aurelia/platform-browser';

const platform = new BrowserPlatform(window);
setPlatform(platform);
BrowserPlatform.set(globalThis, platform);

describe('Currency Converter', () => {

    test('formats valid currency value using the converter', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${amount | currency}</div>',
            class App {
                amount = '8402881';
            },
            [ CurrencyValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('$8,402,881.00');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

    test('does not format invalid value', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${amount | currency}</div>',
            class App {
                amount = 'ddd';
            },
            [ CurrencyValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('$NaN');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

    test('does not format invalid value', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${amount | currency}</div>',
            class App {
                amount = undefined;
            },
            [ CurrencyValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

});