import pino from "pino";

export type Logger = pino.Logger;
export type LoggerOpts = pino.LoggerOptions;

export function crateLogger(opts?: pino.LoggerOptions): pino.Logger {
	return pino(
		Object.assign(opts ?? {}, {
			transport: {
				target: "pino-pretty",
			},
		})
	);
}

export { BaileysProvider } from "./provider/baileys.provider";
export { ProviderClass } from "./provider/provider.base";
export { UserFacingSocketConfig } from "@adiwajshing/baileys";
