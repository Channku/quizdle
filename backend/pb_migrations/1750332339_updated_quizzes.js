/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lrujca3r",
    "name": "color",
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
  collection.schema.removeField("lrujca3r")

  return dao.saveCollection(collection)
})
