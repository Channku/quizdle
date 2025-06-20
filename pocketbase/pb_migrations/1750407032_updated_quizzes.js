/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // remove field
  collection.fields.removeById("text2245608546")

  // remove field
  collection.fields.removeById("text2254405824")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number2245608546",
    "max": null,
    "min": null,
    "name": "count",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number2254405824",
    "max": null,
    "min": null,
    "name": "duration",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("cxityrjmgfzkyjr")

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2245608546",
    "max": 0,
    "min": 0,
    "name": "count",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2254405824",
    "max": 0,
    "min": 0,
    "name": "duration",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number2245608546")

  // remove field
  collection.fields.removeById("number2254405824")

  return app.save(collection)
})
