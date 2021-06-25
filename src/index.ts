export type Model = BooleanModel | NumberModel | StringModel | ArrayModel | TupleModel | DictionaryModel | MapModel | UnionModel | ModelReference;

export interface ModelFieldCommon {
  comment?: string,
}

export const BooleanModelTypeSignature = "model.boolean" as const;
export interface BooleanModel extends ModelFieldCommon {
  type: typeof BooleanModelTypeSignature,
}

export const NumberModelTypeSignature = "model.number" as const;
export interface NumberModel extends ModelFieldCommon {
  type: typeof NumberModelTypeSignature,
  format?: "double",
  constraints?: {
    min?: number,
    max?: number,
    enum?: number[],
  },
}

export const StringModelTypeSignature = "model.string" as const;
export interface StringModel extends ModelFieldCommon {
  type: typeof StringModelTypeSignature,
  encoding?: "utf-8",
  format?: "string" | "date-ISO8601" | "datetime-ISO8601" | "bytes-base64",
  constraints?: {
    minLength?: number,
    maxLength?: number,
    enum?: string[],
    regex?: string,
  },
}

export const ArrayModelTypeSignature = "model.array" as const;
export interface ArrayModel extends ModelFieldCommon {
  type: typeof ArrayModelTypeSignature,
  elements: Model,
  constraints?: {
    minLength?: number,
    maxLength?: number,
  },
}

export const TupleModelTypeSignature = "model.tuple" as const;
export interface TupleModel extends ModelFieldCommon {
  type: typeof TupleModelTypeSignature,
  elements: Model[],
}

export const DictionaryModelTypeSignature = "model.dictionary" as const;
export interface DictionaryModel extends ModelFieldCommon {
  type: typeof DictionaryModelTypeSignature,
  fields: [string, Model][],
}

export const MapModelTypeSignature = "model.map" as const;
export interface MapModel extends ModelFieldCommon {
  type: typeof MapModelTypeSignature,
  keyType: Model,
  valueType: Model,
}

export const UnionModelTypeSignature = "model.union" as const;
export interface UnionModel extends ModelFieldCommon {
  type: typeof UnionModelTypeSignature,
  elements: Model[],
}

export const ModelReferenceTypeSignature = "model.reference" as const;
export interface ModelReference extends ModelFieldCommon {
  type: typeof ModelReferenceTypeSignature,
  id: string,
}

export interface HttpRestContract {
  id: string,
  tags: string[],
  deprecated?: boolean,

  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  headers?: DictionaryModel,
  requestBody: Model,
  responses: {
    name: string,
    code: number,
    body: Model,
  }[],
}
