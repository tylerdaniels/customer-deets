import { createContext, useContext } from "react";
import type { CustomerApi } from "../services/customer-api";

export type ApiContext = {
  customer: CustomerApi;
};

const UNDEFINED_CONTEXT = Symbol("UNDEFINED_CONTEXT");
const REACT_API_CONTEXT = createContext<ApiContext | typeof UNDEFINED_CONTEXT>(
  UNDEFINED_CONTEXT
);

// eslint-disable-next-line react-refresh/only-export-components
export function useApi(): ApiContext {
  const context = useContext(REACT_API_CONTEXT);
  if (context === UNDEFINED_CONTEXT) {
    throw new Error("useApi must be used within a ApiContextProvider");
  }
  return context;
}

type ApiContextProviderProps = {
  children: React.ReactNode;
  value: ApiContext;
};

export const ApiContextProvider = ({
  children,
  value,
}: ApiContextProviderProps) => {
  return (
    <REACT_API_CONTEXT.Provider value={value}>
      {children}
    </REACT_API_CONTEXT.Provider>
  );
};
