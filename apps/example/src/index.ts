// import { addKeyword } from "./../../../packages/core";
import { Wasap } from "./../../../packages/bot";

const w = new Wasap({ provider: "baileys" });

const q = w.addKeyworld({ action: ["asd"] });

w.addAnswer(q.uid, { action: ["das"] });

console.log(w.ctx);
