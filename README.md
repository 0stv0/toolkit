### Installation
```bash
npm install @0stv0/toolkit
```
### Logger
```ts
import { Logger } from '@0stv0/toolkit';

Logger.info('info msg');
Logger.warn(123);
Logger.error(false);
```

### AES256
```ts
import { AES } from "@0stv0/toolkit";

let aes: AES = new AES({
    secret: 'somesecret',
    tagLength: 16, // Optional, default 16
    ivLength: 12 // Optional, default 12
});
aes.encode('123'); // 9xGGjwWY6oHovPGUPS2a7SuMOUBllanJtiwjrIfadA==
aes.decode('9xGGjwWY6oHovPGUPS2a7SuMOUBllanJtiwjrIfadA==') // 123
```

### JWT
```ts
import { JWT } from "@0stv0/toolkit";

let jwt: JWT = new JWT('somesecret');
jwt.sign({
    user: 'stevku',
    value: 123,
    otherValue: false
}, 60); // 60 seconds

jwt.decode('sometoken');
// null if expired or invalid
// valid return payload
```

### Passwords
```ts
import { Passwords } from "@0stv0/toolkit";

let plain: string = 'strongpass';
let hash: string  = Passwords.hash(plain);

console.log(plain, hash);
console.log(Passwords.verify(plain, hash));
```

### Checker
```ts
import { Checker } from "@0stv0/toolkit";

Checker.email('email@example.com');
Checker.empty('');
```

### env
```ts
import { env } from "@0stv0/toolkit";

env.load();

// env.get(key, fallback)
// process.env still works
env.get("PORT", 8080);
env.get("HOST", "127.0.0.1");
```

### Requests
```ts
import { JsonRequests, ToonRequests } from "@0stv0/toolkit";

type TestUser = {
    username: string;
    id: number;
};

let data: TestUser[] | null = await JsonRequests.get<TestUser[]>({
    url: 'someurl',
    headers: {
        'some-header': 'some-value'
    },
    auth: 'some jwt or sessionid'
});
let data2: TestUser[] | null = await JsonRequests.post<TestUser[]>({
    url: 'someurl',
    body: {
        key: 123
    }
});
```

### Random
```ts
import { Random } from "@0stv0/toolkit";

console.log(Random.code({
    length: 6,
    result: 'str'
}));
console.log(Random.code({
    length: 10,
    result: 'num'
}));
console.log(Random.string({length: 16}));

// output
// 259283
// [
//   1, 5, 9, 9, 4,
//   7, 3, 1, 2, 2
// ]
// c7675ca340683c44
```

### SafeJSON
```ts
import { SafeJSON } from "@0stv0/toolkit";

let obj: object = {
    key: 123,
    key2: 321
};
SafeJSON.stringify(obj); // string | null if error
SafeJSON.parse<Record<string, any>>('{}'); // T | null if error
```

### Validator
```ts
import { Validator } from "@0stv0/toolkit";

const testBodyFromRequest: object = {
    id: 123
};
let errors: Record<string, string[]> = Validator.validate(testBodyFromRequest, {
    'id': [
        {
            required: true,
            errorMsg: "Invalid id",
            checker: (v: any): boolean => v === 321
        }
    ]
});
// Record contains all found errors by body key
```

## Sessions
### SessionCore implementation
```ts
import { SessionCore, SessionProps } from "@0stv0/toolkit";

class MySession extends SessionCore
{
    private readonly newValue: number;
    constructor(props: SessionProps, newValue: number)
    {
        super(props);
        this.newValue = newValue;
    };
};
export { MySession };
```

### SessionStore implementation
```ts
import { SessionStore } from "@0stv0/toolkit";
import { MySession } from "./MySession.js";

class MyStore extends SessionStore<MySession>
{
    load(): this | Promise<this> {
        throw new Error("Method not implemented.");
    }
    add(): boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    remove(): boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    get(): MySession | Promise<MySession | undefined> | undefined {
        throw new Error("Method not implemented.");
    }
    getAll(): MySession[] | Promise<MySession[]> {
        throw new Error("Method not implemented.");
    }
};
export { MyStore };
```

### Creating session instance
```ts
import { MySession } from "./MySession.js";

// New session
let session: MySession = new MySession({
    user: 'stevku',
    isNew: true, // if true, then generates random sid
    valid: true // if new, set to true
}, 123);

// Some old sessions loader
let session2: MySession = new MySession({
    user: 'userFromDb',
    isNew: false,
    valid: true,
    sid: 'sidFromDb'
}, 123);
```