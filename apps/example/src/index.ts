// import { addKeyword } from "./../../../packages/core";
import { Wasap } from "./../../../packages/bot";

const w = new Wasap({ provider: "baileys" });

const q = w.addKeyword({ action: ["pong"] });
/*
const d2 = w.addAnswer(d1.uid, { action: ["das2"] });
const d3 = w.addAnswer(d2.uid, { action: ["das3"] });
const d4 = w.addAnswer(d3.uid, { action: ["das4"] });
w.addAnswer(d4.uid, { action: ["das5"] });
*/
console.log(q);
