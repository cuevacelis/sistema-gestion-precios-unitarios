export class FetchError extends Error {
	type: string;
	constructor({
		message,
		type,
		options,
	}: {
		message: string;
		type: string;
		options?: ErrorOptions;
	}) {
		super(message, options);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, FetchError);
		}

		this.name = this.constructor.name;
		this.type = type;
	}
}
