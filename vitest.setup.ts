import "@testing-library/jest-dom";

// Mock localStorage if missing or incomplete
if (typeof window !== "undefined") {
  const store: Record<string, string> = {};
  const localStorageMock = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      for (const key in store) {
        delete store[key];
      }
    },
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
}
