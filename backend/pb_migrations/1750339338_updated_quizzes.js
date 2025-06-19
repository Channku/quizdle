/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j4sshpsj",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6tew16ebad5n1mn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // remove
  collection.schema.removeField("j4sshpsj")

  return dao.saveCollection(collection)
})
