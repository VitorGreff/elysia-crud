import { Elysia } from "elysia";
import { vehicles } from "./db/data";
import { vehicleSchema, paramId } from "./models/vehicle";

const app = new Elysia()
  .all('/', () => 'hi, from elysia ;)')
  .get('/vehicles', () => vehicles)
  .get('/vehicle/:id', ({ params: { id } }) => {
    if (vehicles[id]) {
      return { status: 200, body: vehicles[id] }
    }
    else {
      return { status: 404, body: 'vehicle not found on database' }
    }
  }, {
    params: paramId
  })
  .post('/vehicle', ({ body }) => {
    vehicles.push(body)
    return { status: 201, body: vehicles }
  }, {
    body: vehicleSchema
  })
  .put('/vehicle/:id', ({ params: { id }, body }) => {
    let curr = vehicles[id]
    if (curr) {
      let updated = Object.assign(curr, body)
      return { status: 202, body: updated }
    }
    else {
      vehicles.push(body)
      return { status: 201, body: body }
    }
  }, {
    params: paramId,
    body: vehicleSchema
  }
  )
  .delete('/vehicle/:id', ({ params: { id } }) => {
    let curr = vehicles[id]
    if (curr) {
      vehicles.splice(id, 1)
      return { status: 200, body: curr }
    }
    else {
      return { status: 404, body: 'vehicle not found on database' }
    }
  }, {
    params: paramId
  })

  .listen(8080)
// tests
// app.handle(new Request('http://localhost/'))
//   .then(console.log)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
