import * as Y from "yjs";
import {TypedMap} from "../src";
import {expectAssignable, expectError, expectType} from "tsd";

type Bar = {
    prop1: string;
    prop2: Y.Text;
};

const kv = new Y.Map() as TypedMap<{ [key: string]: Bar }>;
const map = new Y.Map() as TypedMap<Bar>;

// get
expectType<Bar | undefined>(kv.get("key"));

expectType<string | undefined>(map.get("prop1"));
expectError(map.get("unknownKey"));
// fixme
// expectType<string | Y.Text | undefined>(m1.get("unknownKey"));

// set
expectType<string>(map.set("prop1", "value"));
expectError(map.set("unknownKey", "value"));

// has
expectType<boolean>(map.has("prop1"));
expectError(map.has("unknownKey"));  // todo too strict?

// delete
expectType<void>(map.delete("prop1"));
expectError(map.delete("unknownKey")); // todo too strict?

// clone
expectType<TypedMap<Bar>>(map.clone());

// keys
expectType<IterableIterator<"prop1" | "prop2">>(map.keys());

// values
expectType<IterableIterator<string | Y.Text>>(map.values());

// entries
expectType<IterableIterator<["prop1" | "prop2", string | Y.Text]>>(map.entries());

// forEach
map.forEach((v, k, m) => { // todo ?
    expectType<string | Y.Text>(v);
    expectType<"prop1" | "prop2">(k);
    expectType<TypedMap<Bar>>(m);
});

// for
for (const [k, v] of map) { // todo ?
    expectType<string | Y.Text>(v);
    expectType<"prop1" | "prop2">(k);
}

// assignability test
expectAssignable<TypedMap<Bar>>(new Y.Map() as TypedMap<Bar & { "extra": string }>);
