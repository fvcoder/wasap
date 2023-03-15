import type { Logger, LoggerOpts } from "wasap-core";
import { BaileysProvider, crateLogger, ProviderClass, UserFacingSocketConfig } from "wasap-core";

export interface WasapOpts<T = "baileys", K = null> {
	provider: T;
	opts?: K;
	loggerOpts?: LoggerOpts;
}

export type opts = WasapOpts<"baileys", UserFacingSocketConfig> | WasapOpts<"twilio", void>;

export class Wasap {
	logger: Logger;
	provider: ProviderClass;

	constructor({ loggerOpts, provider, opts }: opts) {
		this.logger = crateLogger(loggerOpts);

		if (provider === "baileys") {
			this.provider = new BaileysProvider();
		}

		this.provider.on("preinit", () => this.logger.info("starting"));
	}
}
