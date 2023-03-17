import { v4 } from "uuid";

import { getKeywordOpts } from "./getOptions";
import { flowKeyword, flowKeywordNormalize } from "./types";

export interface keywordCtx {
	uid: string;
	keywords: flowKeywordNormalize["keywords"];
	args: Omit<flowKeywordNormalize, "keywords">;
	json: Omit<keywordCtx, "json">[];
}

export function addKeyword(opts: Partial<flowKeyword>): keywordCtx {
	const { keywords, sensitive, blacklist, whitelist } = getKeywordOpts(opts);

	const uid = `k_${v4()}`;
	const args = { sensitive, blacklist, whitelist };

	return {
		uid,
		keywords,
		args,
		json: [{ uid, keywords, args }],
	};
}
