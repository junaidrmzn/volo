import type { FieldPath } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import type { TypedSchema } from "yup/lib/util/types";

export type FormValues<Schema extends TypedSchema> = Asserts<Schema>;

export type FieldName<Schema extends AnyObjectSchema> = keyof TypeOf<Schema> & string & FieldPath<FormValues<Schema>>;
