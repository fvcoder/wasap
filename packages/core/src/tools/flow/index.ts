import { getanswerOpts, getKeywordOpts } from "./getOptions";
import { answerCtx, FlowCtx, keywordCtx } from "./types";

/**
 * @description hola descr
 */
export class Flow {
	ctx: FlowCtx[];

	constructor() {
		this.ctx = [];
	}

	addKeyworld(opts: Partial<Omit<keywordCtx, "uid" | "type">>): keywordCtx {
		const keyword = getKeywordOpts(opts);

		if (keyword.action.length === 0) {
			throw new Error("addKeyworld action invalid");
		}
		this.ctx.push(keyword);

		return keyword;
	}

	removeKeyworld(uid: string): void {
		const index = this.ctx.findIndex((x) => x.uid === uid && x.type === "keyword");
		if (index !== -1) {
			this.ctx.splice(index, 1);
		}

		return;
	}

	addAnswer(parentUid: string, opts: Partial<Omit<answerCtx, "uid" | "type">>): answerCtx {
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
}

export { answerCtx, baseCtx, FlowCtx, keywordCtx } from "./types";
