import { SlugifyValueConverter } from './../../src/resources/value-converters/slugify-converter';
import { createFixture, setPlatform } from '@aurelia/testing';
import { BrowserPlatform } from '@aurelia/platform-browser';

const platform = new BrowserPlatform(window);
setPlatform(platform);
BrowserPlatform.set(globalThis, platform);

describe('Slugify', () => {

    test('creates a slug from two words', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${text | slugify}</div>',
            class App {
                text = 'Simple test';
            },
            [ SlugifyValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('simple-test');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

    test('invalid value is returned', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${text | slugify}</div>',
            class App {
                text = null;
            },
            [ SlugifyValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

});