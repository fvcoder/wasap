# wasap-core
Es un conjunto de herramientas para [wasap-bot](https://www.npmjs.com/package/wasap-bot), pero puede ser de utilidad para diferentes proyectos de chatbot.

## Instalacion
```bash
npm install wasap-core
```

## Uso
La libreria usa flujos de conversacion. Estos se guardan en
memoria o en una base de datos, dependiendo de su preferencia.

Para iniciar la libreria debe importar la clase `Flow`

```ts
import { Flow } from "wasap-core"

const f = new Flow()
```
para añadir un flujo debe invocar `addKeyword`
```ts
const flow1 = f.addKeyword({
    action: ['ping'] // requerido
})
/*
{
    uid: 'k_054fa341-4573-45a0-80d3-63f101cc6b40',
    type: 'keyword',
    action: [ 'ping' ],
    children: 'a_6df15e99-4bf5-470a-8180-236229aa6063',
    sensitive: false,
    blacklist: [],
    whitelist: [],
    hash: "947263d7584f4d03d8ea03bf9664a0e2"
}
*/
```
para añadir una respuesta debe invocar `addAnswer`
```ts
f.addAnswer(flow1.uid, {
    action: ['pong'] // requerido
})
/*
{
    uid: 'a_6df15e99-4bf5-470a-8180-236229aa6063',
    type: 'answer',
    action: [ 'pong' ],
    image: '',
    buttons: [],
    callback: [Function (anonymous)],
    children: undefined,
    sensitive: false,
    blacklist: [],
    whitelist: [],
    hash: "64cebd42f90477f55bcc5d13350d6c72"
}
*/
```
para retornar el flujo de conversacion invoque `getObject` 
```ts
f.getObject(flow1.uid)
/*
{
    uid: 'k_054fa341-4573-45a0-80d3-63f101cc6b40',
    type: 'keyword',
    action: [ 'ping' ],
    children: {
        uid: 'a_6df15e99-4bf5-470a-8180-236229aa6063',
        type: 'answer',
        action: [ 'pong' ],
        image: '',
        buttons: [],
        callback: [Function (anonymous)],
        children: undefined,
        sensitive: false,
        blacklist: [],
        whitelist: [],
        hash: "64cebd42f90477f55bcc5d13350d6c72"
    },
    sensitive: false,
    blacklist: [],
    whitelist: [],
    hash: "947263d7584f4d03d8ea03bf9664a0e2"
}
*/
```

## Tips
1. Puede extender esta clase.
2. Para realzar un bot dinamico puede el retorno el 
`callback` de `asnwerCtx` para redireccionar entre flujos
utilizando `uid`.
3. Puede crear una base de datos que guarde los flujos
de conversacion.

|  id  | data | type | hash | hashParent |
| ---- | ---- | ---- | ---- | ---------- |
|   1  | "{ 'action:' [ 'ping' ]...}"  | "keyword"  | "947263..." |  |
|   2  | "{ 'action:' [ 'pong' ]...}"  | "answer"   | "64cebd..." | "947263..." |