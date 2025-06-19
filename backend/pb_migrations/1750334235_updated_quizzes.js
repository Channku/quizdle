/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ioithvyi",
    "name": "beschreibung",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // remove
  collection.schema.removeField("ioithvyi")

  return dao.saveCollection(collection)
})
