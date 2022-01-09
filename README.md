# Directus Data Model

This repository is a proof of concept for creating data models for directus programmatically instead of with the admin UI.

## Example

```javascript
import { build } from "directus-data-model"

const model = build((builder) => {
  const products = builder
    .collection("products")
    .translation("es-ES", "Restaurantes", "restaurante", "restaurantes");

  products
    .primary_key("id", "integer")
    .hidden()
    .readonly()
    .translation("es-ES", "ID");

  products
    .date_created("created_at")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Fecha de creación");

  products
    .user_created("created_by")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Creado por");

  products
    .date_updated("updated_at")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Fecha de actualización");

  products
    .user_updated("updated_by")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Actualizado por");

  products
    .integer("order")
    .hidden()
    .width("half")
    .translation("es-ES", "Orden");
  
  products.sort("order");

  products
    .string("status")
    .default("draft")
    .width("half")
    .interface("select-dropdown", {
      choices: [
        { text: "$t:published", value: "published" },
        { text: "$t:draft", value: "draft" },
        { text: "$t:archived", value: "archived" }
      ]
    })
    .display("labels", {
      showAsDot: true,
      choices: [
        { background: "#00C897", value: "published" },
        { background: "#D3DAE4", value: "draft" },
        { background: "#F7971C", value: "archived" }
      ]
    })
    .translation("es-ES", "Estado");

  products.archive("status", "archived", "draft");
});

const baseURL = "http://localhost:8080";
const email = "admin@example.com";
const password = "secret";

model.fetch(baseURL, email, password).then(({ collections, relations }) => {
  console.log(JSON.stringify(collections, null, 2));
  console.log(JSON.stringify(relations, null, 2));
});
```
