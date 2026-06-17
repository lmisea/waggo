import { useCallback, useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { fetchServices } from "../services/api";
import { Service, ServiceCategory } from "../types/service";

export const useServices = () => {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>("Todos");

  const loadAndFilterServices = useCallback(
    async (category: ServiceCategory) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchServices();
        setAllServices(data);

        // Filtrado de los servicios según la categoría seleccionada
        const filtered =
          category === "Todos"
            ? data
            : data.filter((s) => s.category === category);

        // Filtrado especial para los servicios destacados
        const featured = filtered.filter((s) => s.tags?.includes("popular"));

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setFilteredServices(filtered);
        setFeaturedServices(featured);
      } catch (err: any) {
        setError(err.message || "Ocurrió un error inesperado");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadAndFilterServices("Todos");
  }, [loadAndFilterServices]);

  // Con esto cambiamos la categoría activa y recargamos los servicios filtrados
  const changeCategory = async (category: ServiceCategory) => {
    setActiveCategory(category);
    await loadAndFilterServices(category);
  };

  return {
    services: filteredServices,
    featuredServices,
    isLoading,
    error,
    activeCategory,
    changeCategory,
    refetch: () => loadAndFilterServices(activeCategory),
  };
};
