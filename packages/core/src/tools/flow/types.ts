export interface answerPromptArgs {
	/** ID del cliente */
	client: string;
	/** Uid de la anterior proceso */
	parentUid: string;
	/** respuesta del cliente */
	prompt: string;
}

/** Funcion que se ejecuta en respuesta ante una solicitud */
export type answerPrompt = (prompt: answerPromptArgs) => Promise<string | null> | string | null;

export interface baseCtx {
	/** true: es sensible a mayusculas/minusculas, false: todo el texto se procesara en minusculas */
	sensitive: boolean;
	/** ID de usuarios que no pueden acceder al flujo, si esta vacio se acepta a todos los usuarios */
	blacklist: string[];
	/** ID de usuarios que pueden acceder al flujo, si esta vacio se acepta a todos los usuarios */
	whitelist: string[];
	/** uid del flijo para el siguiente paso */
	children?: string;
	/** integridad del contexto */
	hash: string;
}

export interface keywordCtx extends Partial<baseCtx> {
	/** uid: Identificador Unico */
	uid: string;
	/** Tipo de flujo */
	type: "keyword";
	/** palabras que activan el flujo */
	action: string[];
}

export interface answerCtx extends Partial<baseCtx> {
	/** uid: Identificador Unico */
	uid: string;
	/** Tipo de flujo */
	type: "answer";
	/** palabras que responden al usuario */
	action: string[];
	/** Url de la imagen que desee enviar al usuario */
	image: string;
	/** Botones que desee enviar al usuario */
	buttons: Array<{ body: string }>;
	callback: answerPrompt;
}

/** Flujos acceptados en memoria */
export type FlowCtx = keywordCtx | answerCtx;

/** Flujo de conversacion en Objeto */
export type FlowCtxObj = Omit<FlowCtx, "children"> & {
	children: FlowCtxObj | undefined;
};
