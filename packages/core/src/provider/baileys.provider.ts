import makeWASocket, {
	Browsers,
	useMultiFileAuthState,
	UserFacingSocketConfig,
} from "@adiwajshing/baileys";
import { Logger } from "pino";
import qrcode from "qrcode-terminal";

import { ProviderClass } from "./provider.base";

interface BaileysConstructor {
	baileysExtraConfig?: UserFacingSocketConfig;
	logger: Logger;
}

export class BaileysProvider extends ProviderClass {
	vendor: ReturnType<typeof makeWASocket>;
	logger: Logger;

	constructor({ baileysExtraConfig, logger }: BaileysConstructor) {
		super();
		this.logger = logger;
		/*
		this.init({ baileysExtraConfig }).catch((e) => {
			this.logger.error(`[baileys]: `, e);
		});
		*/
	}

	async init({
		baileysExtraConfig,
	}: Pick<BaileysConstructor, "baileysExtraConfig">): Promise<void> {
		const { state } = await useMultiFileAuthState("baileys_auth_info");
		this.vendor = makeWASocket(
			Object.assign(
				{
					logger: this.logger,
					browser: Browsers.macOS("Desktop"),
					printQRInTerminal: false,
					auth: {
						creds: state.creds,
						keys: state.keys,
					},
				},
				baileysExtraConfig
			)
		);

		// init
		this.vendor.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
			/** Conexion abierta correctamente */
			if (connection === "open") {
				this.emit("ready", true);
			}
			if (qr) {
				qrcode.generate(qr, { small: true });
			}
		});
	}
}
