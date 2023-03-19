/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Logger, LoggerOpts } from "wasap-core";
import {
	BaileysProvider,
	crateLogger,
	Flow,
	ProviderClass,
	UserFacingSocketConfig,
} from "wasap-core";

export interface WasapOpts<T = "baileys", K = null> {
	/**
	 * @argument {baileys|twilio} provider Provider: baileys(free) or twilio(paid)
	 */
	provider: T;

	/**
	 * @argument {UserFacingSocketConfig|void} opts Provider Options
	 */
	opts?: K;

	/**
	 * @argument {LoggerOpts} loggerOpts Logger Options
	 */
	loggerOpts?: LoggerOpts;
}

export type coreOpts = WasapOpts<"baileys", UserFacingSocketConfig> | WasapOpts<"twilio", void>;

/**
 * @description create a whatsapp bot instance
 */
export class Wasap extends Flow {
	logger: Logger;
	provider: ProviderClass;

	/**
	 * @param {coreOpts} core bot core options
	 * @param {any} storage of conversations
	 */
	constructor(core: coreOpts) {
		super();
		this.logger = crateLogger(core.loggerOpts);

		if (core.provider === "baileys") {
			this.provider = new BaileysProvider({ baileysExtraConfig: core.opts, logger: this.logger });
		}
		this.logger.info("starting");
		this.provider.on("preinit", () => this.logger.info("starting"));
	}
}
