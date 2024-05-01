# Flick API Client

A library for consistently interacting with the Flick API. Currently consists only of a deserializer to normalize responses from the API.

At some point in the future this may cover other client-related use cases, like fetching endpoints and handling errors.

## Usage

Add this package to your package.json:
```json
"@flick/flick-api-client": "latest"
```

Then, require the deserializer:
```javascript
const { Deserializer } = require("@flick/flick-api-client")
```

And use it on a response from the api:
```javascript
const response = await client.apiCall({ ... })
const json = await response.json();
const deserializer = new Deserializer({ keyForAttribute: "camelCase" });
return await deserializer.deserialize(json);
```
_(NB this process will be streamlined in the future)_

## Development

### Versioning
We use [SemVer](https://semver.org/) for our versioning.

- Breaking changes (without backward compability) increment the first number. e.g. 1.x.x -> 2.0.0
- Minor changes (with backward compatibility), or new features, increment the second number. e.g. 0.11.0 -> 0.12.0
- Internal fixes and patches (with backward compatibility), increment the last number. e.g. 0.12.0 -> 0.12.1
- Any breaking changes should be clearly noted with "Breaking change: [description]".

NOTE: Make sure that the version is in the format x.x.x, where x is any number. Formats like x.x.x.x will break npm packaging.
