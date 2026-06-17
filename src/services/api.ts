import { mockServices } from "../data/mockData";
import { BookingFormData } from "../types/booking";
import { Service } from "../types/service";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchServices = async (): Promise<Service[]> => {
  // Simulamos un pequeño delay para imitar una consulta al servidor
  await delay(800);

  // Simulamos una probabilidad de fallo del 15% para probar el estado de error de la lista
  const randomFailure = Math.random() < 0.15;
  if (randomFailure) {
    throw new Error(
      "No se pudieron cargar los servicios. Por favor, verifica tu conexión a internet.",
    );
  }

  return mockServices;
};

export const submitBooking = async (
  data: BookingFormData,
  simulateError: boolean = false,
): Promise<{ success: boolean }> => {
  await delay(1500); // Simulamos el delay de 1,5 segundos para el procesamiento de la reserva

  const randomFailure = Math.random() < 0.35;

  if (
    simulateError ||
    data.fullName.toLowerCase().includes("error") ||
    randomFailure
  ) {
    throw new Error(
      "No se pudo establecer conexión con los servidores de Waggo. Por favor, verifica tu red e intenta nuevamente.",
    );
  }

  console.log("Reserva procesada con éxito en el servidor:", data);
  return { success: true };
};
