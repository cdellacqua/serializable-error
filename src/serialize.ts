function serializeChecked(obj: Record<string, any>, maxDepth = 256, currentDepth: number): Record<string, any> {
	const serialized: Record<string, any> = {};

	Object.getOwnPropertyNames(obj).forEach((propName) => {
		if (typeof obj[propName] === 'object' && obj[propName] !== null) {
			if (currentDepth < maxDepth) {
				serialized[propName] = serializeChecked(obj[propName], maxDepth, currentDepth + 1);
			} else {
				serialized[propName] = 'maximum depth exceeded, skipping child object';
			}
		} else {
			serialized[propName] = obj[propName];
		}
	});

	return serialized;
}

export function serialize(obj: Record<string, any>, maxDepth = 256): Record<string, any> {
	return serializeChecked(obj, maxDepth, 0);
}