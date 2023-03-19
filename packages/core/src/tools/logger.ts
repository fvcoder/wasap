import pino from "pino";

export type Logger = pino.Logger;
export type LoggerOpts = pino.LoggerOptions;

/**
 * Crea una instancia de logger (pino)
 * @param {LoggerOpts} opts Opciones del logger (pino)
 * @see https://github.com/pinojs/pino/blob/HEAD/docs/api.md#options
 * @returns {Logger}
 */
export function crateLogger(opts?: pino.LoggerOptions): pino.Logger {
	return pino(
		Object.assign(
			{
				transport: {
					target: "pino-pretty",
				},
			},
			opts
		)
	);
}
