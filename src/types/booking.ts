import { z } from "zod";

export const BookingSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  // Regex (0412, 0414, 0416, 0422, 0424, 0426 + 7 dígitos)
  phone: z.string().regex(/^04(12|14|16|22|24|26)\d{7}$/, {
    message: "Ingresa un número válido (ej. 04121234567)",
  }),
  date: z.date({ message: "La fecha preferida no es válida" }),
});

export type BookingFormData = z.infer<typeof BookingSchema>;
