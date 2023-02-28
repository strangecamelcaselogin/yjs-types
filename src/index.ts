import * as Y from "yjs";
import {StringKeyOf} from "./utils";

/**
 * TypedDoc is intended to create a typed version of Yjs Doc.
 *
 * Example:
 *
 * type Bar = {
 *     "prop1": string;
 *     "prop2": Y.Text;
 * }
 *
 * const doc = new Y.Doc() as TypedDoc<{ "map1": TypedMap<Bar> }, { "array1": TypedArray<Bar> }>;
 *
 * doc.getMap("map1") // type is TypedMap<Bar>
 * doc.getArray("array1") // type is TypedArray<Bar>
 */
export interface TypedDoc<
    Maps extends Record<string, TypedMap<any>> = Record<string, TypedMap<any>>,
    Arrays extends Record<string, TypedArray<any>> = Record<string, TypedArray<any>>,
    Texts extends Record<string, Y.Text> = Record<string, Y.Text>,
    XmlFragments extends Record<string, Y.XmlFragment> = Record<string, Y.XmlFragment>,
> extends Y.Doc {
    /**
     * I could not write a working type for a get method, this is incomplete implementation:
     * get<SharedTypes extends Maps & Arrays & Texts & XmlFragments, Name extends StringKeyOf<SharedTypes>>(name: Name, TypeConstructor?: Function): SharedTypes[Name];
     * */
    get(name: string, TypeConstructor?: Function): Y.AbstractType<unknown>;

    getMap<Name extends StringKeyOf<Maps>>(name: Name): Maps[Name];

    getArray<Name extends StringKeyOf<Arrays>>(name: Name): Arrays[Name];
}

/**
 * TypedMap is a heavily typed version of Yjs Map.
 * Often in Yjs Map also replaces the plain object, so the src are more complicated than ES2015 Map.
 *
 * Note: to create one from existing Map you have to cast the type of it with the "as" keyword.
 *
 * Default Yjs typing can be defined like this:
 *
 * type Bar = {
 *     "prop1": string;
 *     "prop2": Y.Text;
 * }
 *
 * const m = new Y.Map() as TypedMap<{ [key: string]: Bar }>;
 *
 * m.get("someString") // type is Bar | undefined
 *
 * Object like typing example:
 *
 * const m = new Y.Map() as TypedMap<Bar>;
 *
 * m.get("prop2") // type is Y.Text | undefined
 * m.get("unknownProp") // TS reports error on "unknownProp", type is string | Y.Text | undefined
 */
export interface TypedMap<Data extends Record<string, unknown>> extends Y.Map<any> {
    /**
     * Constructor type is unusable with interface declaration, but this is how I would implement it:
     * new <Key extends StringKeyOf<Data>>(entries?: Iterable<[Key, Data[Key]]>): TypedMap<Data>;
     * */

    clone(): TypedMap<Data>;

    keys<Key extends StringKeyOf<Data>>(): IterableIterator<Key>;

    values<Key extends StringKeyOf<Data>>(): IterableIterator<Data[Key]>;

    entries<Key extends StringKeyOf<Data>>(): IterableIterator<[Key, Data[Key]]>;

    forEach<Key extends StringKeyOf<Data>>(f: (arg0: Data[Key], arg1: Key, arg2: TypedMap<Data>) => void): void;

    delete<Key extends StringKeyOf<Data>>(key: Key): void;

    set<Key extends StringKeyOf<Data>>(key: Key, value: Data[Key]): Data[Key];

    get<Key extends StringKeyOf<Data>>(key: Key): Data[Key] | undefined;

    has<Key extends StringKeyOf<Data>>(key: Key): boolean;

    [Symbol.iterator]<Key extends StringKeyOf<Data>>(): IterableIterator<[Key, Data[Key]]>;
}

/**
 * TypedArray is a typed version of Yjs Array. The only improvement so far is return type of the get method.
 *
 * Example:
 *
 * type Bar = {
 *     "prop1": string;
 *     "prop2": Y.Text;
 * }
 *
 * const a = new Y.Array() as TypedArray<Bar>;
 *
 * a.get(0); // type is string | Y.Text | undefined
 */
export interface TypedArray<T> extends Y.Array<any> {
    get(index: number): T | undefined;
}
