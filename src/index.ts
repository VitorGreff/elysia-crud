import { Elysia, t } from "elysia";
import { vehicles } from "./db/data";


const app = new Elysia()
  .all('/', () => 'hi, from elysia ;)')
  .get('/vehicles', () => vehicles)
  .guard({
    params: t.Object({
      id: t.Numeric()
    })
  })

  .get('/vehicle/:id', ({ params: { id } }) => vehicles[id])
  .post('/vehicle', ({ body }) => {
    const vehicleSchema = t.Object({
      Marca: t.String(),
      Modelo: t.String(),
      Cor: t.String(),
      Placa: t.String(),
      Tipo: t.String(),
    });
    if (!vehicleSchema.validate(body))
        return {status: 400, body :'Invalid vehicle data'}
    vehicles.push(body)

  })
  .put('/vehicle', () => 'vehicle altered')
  .delete('/vehicle', () => 'vehicle deleted')

  .listen(8080)

// tests
// app.handle(new Request('http://localhost/'))
//   .then(console.log)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
