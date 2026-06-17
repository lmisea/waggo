export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  providerName: string;
  durationMinutes: number;
  tags?: string[];
}

export type ServiceCategory =
  | "Todos"
  | "Paseo"
  | "Peluquería"
  | "Entrenamiento"
  | "Guardería"
  | "Veterinario"
  | "Concurso";
