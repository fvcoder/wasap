import pino from "pino";

export type Logger = pino.Logger;
export type LoggerOpts = pino.LoggerOptions;

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
