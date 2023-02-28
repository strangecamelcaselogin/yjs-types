import * as Y from "yjs";
import {TypedArray, TypedDoc, TypedMap} from "../src";
import {expectError, expectType} from "tsd";

type Bar = {
    prop1: string;
    prop2: Y.Text;
}


const doc = new Y.Doc() as TypedDoc<{ map1: TypedMap<Bar> }, { array1: TypedArray<Bar> }>;

// getMap
expectType<TypedMap<Bar>>(doc.getMap("map1"));
expectError(doc.getMap("unknownKey"));

// getArray
expectType<TypedArray<Bar>>(doc.getArray("array1"));
expectError(doc.getArray("unknownKey"));

// get
expectType<Y.AbstractType<unknown>>(doc.get("text", Y.Text));
