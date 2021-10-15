// can't just do InvalidStoreError extends Error
// because of http://babeljs.io/docs/usage/caveats/#classes
export function InvalidStoreError(reason, value) {
    const message = `Store is invalid because ${reason}, ` +
        `please stop the client, delete all data and start the client again`;
    const instance = Reflect.construct(Error, [message]);
    Reflect.setPrototypeOf(instance, Reflect.getPrototypeOf(this));
    instance.reason = reason;
    instance.value = value;
}

InvalidStoreError.TOGGLED_LAZY_LOADING = "TOGGLED_LAZY_LOADING";

InvalidStoreError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});
Reflect.setPrototypeOf(InvalidStoreError, Error);

export function InvalidCryptoStoreError(reason) {
    const message = `Crypto store is invalid because ${reason}, ` +
        `please stop the client, delete all data and start the client again`;
    const instance = Reflect.construct(Error, [message]);
    Reflect.setPrototypeOf(instance, Reflect.getPrototypeOf(this));
    instance.reason = reason;
    instance.name = 'InvalidCryptoStoreError';
}

InvalidCryptoStoreError.TOO_NEW = "TOO_NEW";

InvalidCryptoStoreError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});
Reflect.setPrototypeOf(InvalidCryptoStoreError, Error);

type KeySignatureError = Record<string, Record<string, {
    errcode: string;
    error: string;
}>>;

export class KeySignatureUploadError extends Error {
    public value: KeySignatureError;
    constructor(message: string, value: KeySignatureError) {
        super(message);
        this.value = value;
    }
}
