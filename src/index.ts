export type Model =
  | BooleanModel.Type
  | NumberModel.Type
  | StringModel.Type
  | ArrayModel.Type
  | TupleModel.Type
  | DictionaryModel.Type
  | MapModel.Type
  | UnionModel.Type
  | ModelReference.Type
  | CyclicReferenceModel.Type
  | SpecialModel.Type;

export interface ModelFieldCommon {
  comment?: string,
  optional?: boolean,
  metadata?: { [p: string]: any },
}

export namespace BooleanModel {
  export const signature = "model.boolean" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace NumberModel {
  export const signature = "model.number" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    format?: "double",
    constraints?: {
      min?: number,
      max?: number,
      enum?: number[],
    },
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace StringModel {
  export const signature = "model.string" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    encoding?: "utf-8",
    format?: "string" | "date-ISO8601" | "datetime-ISO8601" | "bytes-base64" | "bigint",
    constraints?: {
      minLength?: number,
      maxLength?: number,
      enum?: string[],
      regex?: string,
    },
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace ArrayModel {
  export const signature = "model.array" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    elements: Model,
    constraints?: {
      minLength?: number,
      maxLength?: number,
    },
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace TupleModel {
  export const signature = "model.tuple" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    elements: Model[],
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace DictionaryModel {
  export const signature = "model.dictionary" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    fields: [string, Model][],
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace MapModel {
  export const signature = "model.map" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    keyType: Model,
    valueType: Model,
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace UnionModel {
  export const signature = "model.union" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    elements: Model[],
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace ModelReference {
  export const signature = "model.reference" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    id: string,
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace CyclicReferenceModel {
  export const signature = "model.cyclic" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
    path: string,
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export namespace SpecialModel {
  export const signature = "model.special" as const;
  export interface Type extends ModelFieldCommon {
    type: typeof signature,
  }
  export function is(x: Model): x is Type {
    return x.type === signature
  }
}

export interface HttpRestContract {
  schemaId: "HttpRestContract.0.2.0",
  id: string,
  tags: string[],
  deprecated?: boolean,

  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  headers?: DictionaryModel.Type,
  requestBody: Model,
  responses: {
    name: string,
    code: number,
    body: Model,
  }[],
}
