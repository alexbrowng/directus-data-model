import { Builder } from "./builder";

export type onDelete = "NO ACTION" | "SET NULL" | "SET DEFAULT" | "CASCADE" | "RESTRICT";

export type RelationSchema = {
  on_delete?: onDelete;
};

export type RelationMeta = {};

export class Relation {
  builder: Builder;
  collection: string;
  field: string;
  related_collection: string | null;
  schema: RelationSchema;
  meta: RelationMeta;

  constructor(
    builder: Builder,
    collection: string,
    field: string,
    related_collection: string | null = null,
    schema?: RelationSchema,
    meta?: RelationMeta
  ) {
    this.builder = builder;
    this.collection = collection;
    this.field = field;
    this.related_collection = related_collection;
    this.schema = schema === undefined ? {} : schema;
    this.meta = meta === undefined ? {} : meta;
  }

  on_delete(option: onDelete) {
    this.schema.on_delete = option;
  }

  render() {
    return {
      collection: this.collection,
      field: this.field,
      related_collection: this.related_collection,
      schema: this.schema,
      meta: this.meta
    };
  }
}
