import { SerializableError } from "../src/index";

beforeAll(() => {
	console.error = jest.fn();
});

describe('constructors', function () {
	it('constructs an error without cause', () => {
		expect(new SerializableError('test').cause).toBeFalsy();
	});
	it('constructs an error with a string cause', () => {
		expect(new SerializableError('test', 'cause').cause).toEqual('cause');
	});
	it('constructs an error with a number cause', () => {
		expect(new SerializableError('test', 1).cause).toEqual(1);
	});
	it('constructs an error with an object cause', () => {
		expect(new SerializableError('test', { test: 1 }).cause).toEqual({ test: 1 });
	});
	it('constructs an error with an Error cause', () => {
		expect(new SerializableError('test', new Error('err')).cause).toBeInstanceOf(Error);
	});
});

describe('serialization', function () {
	it('serializes an error without cause', () => {
		expect(new SerializableError('test').toJSON()).toMatchObject({
			message: 'test',
		});
	});
	it('serializes an error with a string cause', () => {
		expect(new SerializableError('test', 'test2').toJSON()).toMatchObject({
			message: 'test',
			cause: 'test2'
		});
	});
	it('serializes an error with a number cause', () => {
		expect(new SerializableError('test', 1).toJSON()).toMatchObject({
			message: 'test',
			cause: 1
		});
	});
	it('serializes an error with an object cause', () => {
		expect(new SerializableError('test', { test: 1 }).toJSON()).toMatchObject({
			message: 'test',
			cause: {
				test: 1,
			}
		});
	});
	it('serializes an error with an Error cause', () => {
		expect(new SerializableError('test', new Error('err')).toJSON()).toMatchObject({
			message: 'test',
			cause: {
				message: 'err',
			}
		});
	});
	it('contains the stack', () => {
		expect(new SerializableError('test', { test: 1 }).toJSON()).toHaveProperty('stack');
	});
});

describe('conversion', () => {
	it('converts an Error to a SerializableError', () => {
		const subject = SerializableError.from(new Error('native')).toJSON();
		expect(subject).toHaveProperty('stack');
		expect(subject.message).toEqual('native');
	});
});

describe('recursion', () => {
	it('recursively serializes cause objects', () => {
		const subject =
			new SerializableError('depth-0',
				new SerializableError('depth-1',
					new SerializableError('depth-2',
						new SerializableError('depth-3',
							new SerializableError('depth-4')
						),
					),
				),
			).toJSON();
		expect(subject.cause).toBeTruthy();
		expect(subject.cause.cause).toBeTruthy();
		expect(subject.cause.cause.cause).toBeTruthy();
		expect(subject.cause.cause.cause.cause).toBeTruthy();
		expect(subject.cause.cause.cause.cause.message).toEqual('depth-4');
	});
	it('recursively serializes cause objects stopping at depth-3', () => {
		SerializableError.maxDepth = 3;
		const subject =
			new SerializableError('depth-0',
				new SerializableError('depth-1',
					new SerializableError('depth-2',
						new SerializableError('depth-3',
							new SerializableError('depth-4',
								new SerializableError('depth-5'),
							)
						),
					),
				),
			).toJSON();
		expect(subject.cause).toBeTruthy();
		expect(subject.cause.cause).toBeTruthy();
		expect(subject.cause.cause.cause).toBeTruthy();
		expect(subject.cause.cause.cause.cause).toBeTruthy();
		expect(subject.cause.cause.cause.cause).toEqual('maximum depth exceeded, skipping child object');
		expect(subject.cause.cause.cause.cause.cause).toBeUndefined();
	});
});