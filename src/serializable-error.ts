import { serialize } from "./serialize";

/**
 * The SerializableError class inherits the native Error class.
 * It provides a useful alternative that is JSON-serializable and add an optional "cause" object that can be passed to the constructor
 * to further detail the exception that occured in your code.
 */
export class SerializableError extends Error {
	/**
	 * Maximum serialization depth for nested objects
	 */
	static maxDepth: number = 256;

	/**
	 * A cause for this Error
	 */
	cause?: any;

	/**
	 * Instantiates a new SerializableError
	 * @param message a message detailing the error that occured
	 * @param cause a cause for this error (for example, a previously catched error)
	 */
	constructor(message?: string, cause?: any) {
		super(message);
		this.cause = cause;
	}

	/**
	 * Converts a non-serializable error instance into a serializable
	 * @param err a non-serializable error instance
	 */
	static from(err: Error): SerializableError {
		const newErr = new SerializableError();
		const serialized = serialize(err);
		Object.keys(serialized).forEach((key) => {
			(newErr as Record<string, any>)[key] = serialized[key];
		});
		
		return newErr;
	}

	/**
	 * Returns a string containing the JSON representation of the current instance
	 */
	toString(): string {
		return JSON.stringify(this);
	}

	/**
	 * Serializes this instance.
	 * If the cause contains nested objects, they get recursively serialized
	 * until the maxDepth is reached
	 */
	toJSON(): Record<string, any> {
		return serialize(this, SerializableError.maxDepth);
	}
}
