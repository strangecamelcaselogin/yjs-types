import * as Y from "yjs";
import {TypedArray} from "../src";
import {expectType} from "tsd";

const a = new Y.Array<string>() as TypedArray<string>;
expectType<string | undefined>(a.get(42));
