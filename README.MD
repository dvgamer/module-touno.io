# TOUNO.io ![Travis](https://travis-ci.org/touno-project/module.core-systems.svg?branch=master)

### Requirement Environment
```ini
RAVEN_CONFIG=https://{PUBLIC_KEY}:{SECRET_KEY}@sentry.io/{PROJECT_ID}

GITHUB_ID
GITHUB_SECRET
IMGUR_ID
IMGUR_SECRET
COINS_ID
COINS_SECRET

LINE_MINER_API
LINE_TOUNO_API
LINE_DEVOPS_API
LINE_ID

```

----------
### Helper
##### `object` debuger
  - **log** `function(...msg)` message log normal
  - **progress** `object`
    - begin `function(...msg)`
    - set `function(min, max)`
    - end `function(...msg)`
  - **start** `function(...msg)` start log and color green.
  - **success** `function(...msg)` start log and color green.
  - **info** `function(...msg)` info log and color blue.
  - **error** `function(...msg)` error log and color red.

**sample**
```javascript
import { debuger } from 'touno.io'

debuger.log('')
debuger.success('completed.')
debuger.error(new Error('Error Test'))
```

##### `object` Raven
  - **set** `function(config)` set config Raven object on exception.
  - **error** `function(ex)` reporting error to sentry.
  - **warning** `function(ex)` reporting warning to sentry.
----------
### License
MIT © 2018 Touno™
