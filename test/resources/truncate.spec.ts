import { TruncateValueConverter } from '../../src/resources/value-converters/truncate-converter';
import { createFixture, setPlatform } from '@aurelia/testing';
import { BrowserPlatform } from '@aurelia/platform-browser';

const platform = new BrowserPlatform(window);
setPlatform(platform);
BrowserPlatform.set(globalThis, platform);

describe('Truncate', () => {

    test('truncates to 10 characters', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${text | truncate: 10}</div>',
            class App {
                text = 'Simple test';
            },
            [ TruncateValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('Simple tes...');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

    test('invalid value is returned', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${text | truncate}</div>',
            class App {
                text = null;
            },
            [ TruncateValueConverter ]
          );
    
          await startPromise;

          expect(appHost.textContent).toBe('');
    
          await tearDown();

          expect(appHost.textContent).toBe('');
    });

});