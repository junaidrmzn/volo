import type { Language } from "./language";

export type Translation = { [key: string]: string | Translation };
export type TranslationObject = { [language in Language]: string | Translation };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (k: infer I) => void ? I : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? true : false;
export type VerifiedTranslations<T extends TranslationObject> = IsUnion<T[Language]> extends true ? T : never;
