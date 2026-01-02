import { create } from 'zustand';

export const useBuilderStore = create((set, get) => ({
  // 1. ESTADO INICIAL
  selectedComponents: {
    cpu: null,
    // Aquí agregaremos gpu, ram, etc. en el futuro
  },
  totalPrice: 0,

  // 2. ACCIONES (Funciones para modificar el estado)
  
  // Agregar un componente al armado
  addComponent: (type, component) => {
    set((state) => {
      // Calculamos el nuevo precio restando el anterior (si había) y sumando el nuevo
      const previousPrice = state.selectedComponents[type]?.price || 0;
      const newPrice = state.totalPrice - previousPrice + component.price;

      return {
        selectedComponents: {
          ...state.selectedComponents,
          [type]: component
        },
        totalPrice: newPrice
      };
    });
  },

  // Quitar un componente
  removeComponent: (type) => {
    set((state) => {
      const priceToRemove = state.selectedComponents[type]?.price || 0;
      
      return {
        selectedComponents: {
          ...state.selectedComponents,
          [type]: null
        },
        totalPrice: state.totalPrice - priceToRemove
      };
    });
  }
}));