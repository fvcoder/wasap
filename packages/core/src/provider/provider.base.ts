import EventEmitter from "node:events";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface sendMessageI extends Record<string, any> {
	number: string;
	message: string;
}

export class ProviderClass extends EventEmitter {
	// eslint-disable-next-line @typescript-eslint/require-await
	async sendMessage({ message }: sendMessageI): Promise<string> {
		return message;
	}
}
