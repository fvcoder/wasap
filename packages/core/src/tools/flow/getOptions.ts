import { v4 } from "uuid";

import { generateUid } from "./generateUid";
import type { answerCtx, keywordCtx } from "./types";

/**
 * valida/normaliza los parametros para `keywordCtx`
 * @param {Partial<Omit<keywordCtx, "type" | "uid">>} keywordPartial keywordCtx
 * @returns {keywordCtx}
 */
export function getKeywordOpts({
	action,
	children,
	sensitive,
	blacklist,
	whitelist,
}: Partial<Omit<keywordCtx, "type" | "uid">>): keywordCtx {
	const uid = `k_${v4()}`;
	const a: string[] = [];
	const wl: string[] = [];
	const bl: string[] = [];

	if (action && Array.isArray(action)) {
		a.push(...action.filter((x) => typeof x === "string"));
	}

	if (blacklist && Array.isArray(blacklist)) {
		bl.push(...blacklist.filter((x) => typeof x === "string"));
	}
	if (whitelist && Array.isArray(whitelist)) {
		wl.push(...whitelist.filter((x) => typeof x === "string"));
	}

	return {
		uid,
		type: "keyword",
		action: a,
		children: typeof children === "string" ? children : undefined,
		sensitive: typeof sensitive === "boolean" ? sensitive : false,
		blacklist: wl,
		whitelist: bl,
		hash: generateUid(a),
	};
}

/**
 * valida/normaliza los parametros para `answerCtx`
 * @param {Partial<Omit<answerCtx, "type" | "uid">>} answerPartial answerCtx
 * @returns {answerCtx}
 */
export function getanswerOpts({
	action,
	image,
	buttons,
	callback,
	children,
	sensitive,
	blacklist,
	whitelist,
}: Partial<Omit<answerCtx, "type" | "uid">>): answerCtx {
	const uid = `a_${v4()}`;
	const a: string[] = [];
	const b: answerCtx["buttons"] = [];
	const bl: string[] = [];
	const wl: string[] = [];

	if (action && Array.isArray(action)) {
		a.push(...action.filter((x) => typeof x === "string"));
	}

	if (buttons && Array.isArray(buttons)) {
		b.push(...buttons.filter((x) => x.body && typeof x.body === "string"));
	}

	if (blacklist && Array.isArray(blacklist)) {
		bl.push(...blacklist.filter((x) => typeof x === "string"));
	}
	if (whitelist && Array.isArray(whitelist)) {
		wl.push(...whitelist.filter((x) => typeof x === "string"));
	}

	return {
		uid,
		type: "answer",
		action: a,
		image: image ?? "",
		buttons: b,
		callback: typeof callback === "function" ? callback : () => null,
		children: typeof children === "string" ? children : undefined,
		sensitive: typeof sensitive === "boolean" ? sensitive : false,
		blacklist: wl,
		whitelist: bl,
		hash: generateUid(a),
	};
}
