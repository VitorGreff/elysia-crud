
import { t } from "elysia";

export const vehicleSchema = t.Object({
  Marca: t.String(),
  Modelo: t.String(),
  Cor: t.String(),
  Placa: t.String(),
  Tipo: t.String(),
});

export const paramId = t.Object({
  id: t.Numeric()
})
