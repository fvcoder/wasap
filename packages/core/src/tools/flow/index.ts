import { getanswerOpts, getKeywordOpts } from "./getOptions";
import { answerCtx, FlowCtx, FlowCtxObj, keywordCtx } from "./types";

/**
 * @description flujo de conversaciones
 */
export class Flow {
	private readonly ctx: FlowCtx[];

	constructor() {
		this.ctx = [];
	}

	/**
	 * Añade palabras clave para iniciar con el flujo
	 * @param {Partial<Omit<keywordCtx, "uid" | "type">>} opts - keyword Context
	 * @returns {keywordCtx}
	 */
	addKeyword(opts: Partial<Omit<keywordCtx, "uid" | "type" | "hash">>): keywordCtx {
		const keyword = getKeywordOpts(opts);

		if (keyword.action.length === 0) {
			throw new Error("addKeyworld action invalid");
		}
		this.ctx.push(keyword);

		return keyword;
	}

	/**
	 * Remueve el flujo de la base de datos
	 * @param {string} uid Identificador unico de keyword
	 * @returns {void}
	 */
	removeKeyworld(uid: string): void {
		const index = this.ctx.findIndex((x) => x.uid === uid && x.type === "keyword");
		if (index !== -1) {
			this.ctx.splice(index, 1);
		}

		return;
	}

	/**
	 * Añade una respuesta ante un flujo de conversacion
	 * @param {string} parentUid - uid del padre que invoca el proceso, puede ser `keywordCtx` o `answerCtx`
	 * @param {Partial<Omit<answerCtx, "uid" | "type">>} opts Answer Context
	 * @returns {answerCtx}
	 */
	addAnswer(parentUid: string, opts: Partial<Omit<answerCtx, "uid" | "type" | "hash">>): answerCtx {
		const answer = getanswerOpts(opts);

		const keyIndex = this.ctx.findIndex((x) => parentUid === x.uid);

		if (keyIndex === -1) {
			throw new Error(`addAnswer key ${parentUid} not Exist`);
		}
		if (answer.action.length === 0) {
			throw new Error("addAnswer action invalid");
		}

		this.ctx[keyIndex].children = answer.uid;
		this.ctx.push(answer);

		return answer;
	}

	/**
	 * Busca por uid
	 * @param {string} uid parametro de busqueda (uid)
	 * @returns {FlowCtx | undefined}
	 */
	findByUid(uid: string): FlowCtx | undefined {
		return this.ctx.find((x) => x.uid === uid);
	}

	/**
	 * Busca por hash
	 * @param {string} uid parametro de busqueda (hash)
	 * @returns {FlowCtx | undefined}
	 */
	findByHash(hash: string): FlowCtx | undefined {
		return this.ctx.find((x) => x.hash === hash);
	}

	/**
	 * obtiene todo el flujo de conversacion en un Objeto
	 * @param uid parametro de busqueda (uid)
	 * @returns {FlowCtxObj | undefined}
	 */
	getObject(uid: string): FlowCtxObj | undefined {
		const current = this.findByUid(uid);
		if (current) {
			const flow: FlowCtxObj = current as FlowCtxObj;
			if (typeof current.children === "string") {
				flow.children = this.getObject(current.children);

				return flow;
			}

			return flow;
		}

		return undefined;
	}
}

export {
	answerCtx,
	answerPrompt,
	answerPromptArgs,
	baseCtx,
	FlowCtx,
	FlowCtxObj,
	keywordCtx,
} from "./types";
