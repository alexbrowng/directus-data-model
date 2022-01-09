import axios from "axios";

import { Collection } from "./collection";
import { Relation } from "./relation";

export class Builder {
  collections: Collection[];
  relations: Relation[];

  constructor() {
    this.collections = [];
    this.relations = [];
  }

  collection(name: string) {
    const collection = new Collection(this, name);
    this.collections.push(collection);
    return collection;
  }

  relation(collection: string, field: string, related_collection: string | null = null) {
    const relation = new Relation(this, collection, field, related_collection);
    this.relations.push(relation);
    return relation;
  }

  render() {
    return {
      collections: this.collections.map((collection) => collection.render()),
      relations: this.relations.map((relation) => relation.render())
    };
  }

  async fetch(baseURL: string, email: string, password: string) {
    const directus = axios.create({ baseURL });

    const { access_token } = await directus.post("/auth/login", { email, password }).then(({ data: { data } }) => data);

    directus.defaults.headers.common = {
      Authorization: `Bearer ${access_token}`
    };

    const { collections, relations } = this.render();

    const then = ({ data: { data } }: { data: any }) => data;
    const error = ({ response: { data } }: { response: any }) => data;

    return {
      collections: await directus.post("collections", collections).then(then).catch(error),

      relations: await directus.post("relations", relations).then(then).catch(error)
    };
  }
}
