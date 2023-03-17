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
	provider: T;
	opts?: K;
	loggerOpts?: LoggerOpts;
}

export type opts = WasapOpts<"baileys", UserFacingSocketConfig> | WasapOpts<"twilio", void>;

/**
 * @description hola descripcion
 * @param {Object} core - Opciones de Core
 * @param {baileys|twilio} core.provider - Selecciona el proveedor
 * @param {UserFacingSocketConfig|void} core.provider - Opciones del proveedor
 * @param {LoggerOpts} core.loggerOpts - Opciones de logger
 */
export class Wasap extends Flow {
	logger: Logger;
	provider: ProviderClass;

	constructor({ loggerOpts, provider, opts }: opts) {
		super();
		this.logger = crateLogger(loggerOpts);

		if (provider === "baileys") {
			this.provider = new BaileysProvider({ baileysExtraConfig: opts, logger: this.logger });
		}
		this.logger.info("starting");
		this.provider.on("preinit", () => this.logger.info("starting"));
	}
}
