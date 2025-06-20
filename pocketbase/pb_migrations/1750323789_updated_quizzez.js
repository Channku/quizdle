/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2085837051")

  // update collection data
  unmarshal({
    "name": "quizzes"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2085837051")

  // update collection data
  unmarshal({
    "name": "quizzez"
  }, collection)

  return app.save(collection)
})
