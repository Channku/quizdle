/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4009210445",
    "hidden": false,
    "id": "relation3069659470",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "question",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // remove field
  collection.fields.removeById("relation3069659470")

  return app.save(collection)
})
