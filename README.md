# serializable-error

Custom error class that supports JSON serialization and concatenation

## Full documentation:
* [SerializableError](https://github.com/cdellacqua/serializable-error/blob/master/docs/classes/serializableerror.md)

## Highlights

### Keep track of what caused the error
```
try {
	someFunctionThatThrows();
} catch (err) {
	// some error handling logic
	// ...
	throw new SerializableError('something more specific about the current exception', err);
}
```

### Exception logging
```
try {
	someFunctionThatThrows();
} catch (err) {
	logger.log(SerializableError.from(err));
	// or, if it only accepts strings
	logger.log(JSON.stringify(SerializableError.from(err)));
	throw err;
}
```

