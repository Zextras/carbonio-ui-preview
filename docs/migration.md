# Migration guide

## From 1 to 2

With version 2 the react-pdf dependency is upgraded from v7 to v9.
This version includes pdfjs as esm module.

In order to upgrade from @zextras/carbonio-ui-preview v1 to v2 the following changes might be required.

If you face some errors while upgrading, check also the migration guide from react-pdf:
- https://github.com/wojtekmaj/react-pdf/wiki/Upgrade-guide-from-version-7.x-to-8.x
- https://github.com/wojtekmaj/react-pdf/wiki/Upgrade-guide-from-version-8.x-to-9.x

### Webpack

If you use webpack to bundle your application, you will need to add an alias for the new React JSX transform
inside webpack configurations.

```ts
// webpack.config.ts
import webpack from 'webpack';
const config: webpack.Configuration = {
  // other configs
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js'
    }
  }
};

export default config;
```

### Jest

#### Configure jest to transpile also esm modules

@zextras/carbonio-ui-preview and pdfjs-dist are full esm modules.
This means that you need to configure jest to correctly interpret them.
You can do it either enabling jest [esm experimental support](https://jestjs.io/docs/ecmascript-modules),
or using the [transformIgnorePatterns configuration](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring).

Since @zextras/carbonio-ui-preview now uses the module version of pdfjs worker, you will also need to add the mjs extension
to the [transform configuration](https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object).

Your jest config should look like this:

```ts
// jest.config.ts
import type {Config} from 'jest';

const config: Config = {
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: 'your custom config file - optional' }],
    '\\.mjs?$': ['babel-jest', { configFile: 'your custom config file - optional' }],
    // other transformers
  },
  transformIgnorePatterns: [
    // ignore all node_modules except the one in the array
    `/node_modules/(?!(${['@zextras/carbonio-ui-preview', 'pdfjs-dist'].join('|')}))`,
    '\\.pnp\\.[^\\/]+$'
  ]
};

export default config;
```

#### Add the required polyfills in node versions < 22

If you run node in version previous to 22, you will need to polyfill some functions.

You can simply import the required polyfills in the setup file.

```ts
// jest.config.ts
import type {Config} from 'jest';

const config: Config = {
  // ...
  setupFilesAfterEnv: ['jest-env-setup.ts'],
  // ...
};

export default config;
```

```ts
// jest-env-setup.ts

import 'core-js/proposals/promise-with-resolvers';
// other imports
```
