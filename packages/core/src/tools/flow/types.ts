/**
 * Estructura de la tabla (contexto)
 * 
|-------------|--------------|---------------|------------------|
|     uid     |     type     |    acction    |     children     |
|-------------|--------------|---------------|------------------|
| k_i8er-23...|   keyword    |     ping      |	  undefined     |
|-------------|--------------|---------------|------------------|
| a_t856-21...|    answer    |     pong      |    k_i8er-23..   |
|-------------|--------------|---------------|------------------|
 */

export interface baseCtx {
	sensitive: boolean;
	blacklist: string[];
	whitelist: string[];
	children?: string;
}

export interface keywordCtx extends Partial<baseCtx> {
	uid: string;
	type: "keyword";
	action: string[];
}

export interface answerCtx extends Partial<baseCtx> {
	uid: string;
	type: "answer";
	action: string[];
	image: string;
	buttons: Array<{ body: string }>;
	callback: (prompt: string) => Promise<string | null> | string | null;
}

export type FlowCtx = keywordCtx | answerCtx;
