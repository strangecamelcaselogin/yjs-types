# yjs-types

[![npm](https://img.shields.io/npm/v/yjs-types)](https://www.npmjs.com/package/yjs-types)

Refined TypeScript types for Yjs

> This project currently is an experiment, things may change

[Yjs](https://github.com/yjs/yjs) is an excellent library, but it has relatively weak TypeScript support.
This package adds a few new types to improve developer experience with Yjs:
- `TypedMap` - a heavily typed version of Yjs Map
- `TypedArray` - updated version of Yjs Array
- `TypedDoc` - a typed version of Yjs Doc 

Related Yjs issues:
- [yjs/issues/352](https://github.com/yjs/yjs/issues/352)
- [yjs/issues/362](https://github.com/yjs/yjs/issues/362)
- [Extending Yjs Types without breaking everything](https://discuss.yjs.dev/t/extending-yjs-types-without-breaking-everything/769/1)
- [yjs/issues/490](https://github.com/yjs/yjs/issues/490)
- [yjs/issues/499](https://github.com/yjs/yjs/issues/499)

# Note

These types do not guarantee the real state of the document. First of all, you can use `@ts-ignore` or `any` type
to violate type guarantees. Second, Yjs document can be updated from outside.

To be sure, you really want to have some sort of runtime validation. Ideally, you would infer types from that
validation system, and use them with these library types.

I could define four level of types accuracy:

1. _True_ - types should not lie.  
Example: `undefined` as a return type for the `get` methods of `TypedMap` and `TypedArray`.

2. _Should be true_ - can be broken only with `ts-ignore`, `any` or foreign actions.  
Example: `TypedMap` `set`, `has` and `delete` methods.

3. _Possible true_ - generally true, but can be easily broken with TS.  
Example: Types of iterator, `keys`, `values`, `entries` and `forEach` methods of `TypedMap`.

4. _False_ - types are lying.  
No examples here.

`yjs-types` types are implemented intentionally at level _Possible true_.

This practice is common in TypeScript, take a look at the example:
```typescript
const getData = () => ({ a: "123", b: 42, c: null })

const data: { a: string, b: number } = getData();

for (const [k, v] of Object.entries(data)) {
    //         ^? const v: string | number - null is absent
}
```

# Get Started

Install:
```
npm install --save-dev yjs-types
```

Then, import:

```typescript
import { TypedMap } from "yjs-types";
```

# Examples

Yjs standard Map typing can be defined with `TypedMap` like this:
```typescript
type Bar = {
    "prop1": string;
    "prop2": Y.Text;
}

const m = new Y.Map() as TypedMap<{ [key: string]: Bar }>;

m.get("someString") // type is Bar | undefined
```

Object like typing with `TypedMap`:
```typescript
type Bar = {
  "prop1": string;
  "prop2": Y.Text;
}

const m = new Y.Map() as TypedMap<Bar>;

m.get("prop2") // type is Y.Text | undefined
m.get("unknownProp") // TS reports error on "unknownProp", type is string | Y.Text | undefined
```

`TypedDoc` example:
```typescript
type Bar = {
    "prop1": string;
    "prop2": Y.Text;
}

const doc = new Y.Doc() as TypedDoc<{ "map1": TypedMap<Bar> }, { "array1": TypedArray<Bar> }>;

doc.getMap("map1") // type is TypedMap<Bar>
doc.getArray("array1") // type is TypedArray<Bar>
```

# Issues

## Constructor is not covered by `yjs-types`

The nature of current types is such, that Yjs constructor for Map and Array can't be covered by `yjs-types`.

## Proper type for Doc.get(...)

It's too complicated, or it may even be impossible to define a good type for it.

## Merging it to Yjs

I think it would be fantastic, but it would require breaking changes, which would most likely have to be implemented in JSDoc..

## Usage of `any` in generic arguments

I could not solve some errors in TypedDoc if I defined Y.Map or Y.Array with an unknown argument.
