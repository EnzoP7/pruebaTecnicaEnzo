import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({
      required_error: "El nombre no puede quedar vacio.",
    })
    .min(1, "Requerido"),
  price: z
    .number({
      required_error: "El precio no puede quedar vacio.",
      invalid_type_error: "Debe ser un número válido",
    })
    .positive("Debe ser mayor a 0"),
  supplierEmail: z
    .string({
      required_error: "El correo no puede quedar vacio",
    })
    .min(1, "Requerido")
    .email("Debe ser un correo válido"),
  entryDate: z
    .string({
      required_error: "La fecha es Requerida",
    })
    .min(1, "La fecha es Requerida"),
});

export type ProductFormData = z.infer<typeof productSchema>;
