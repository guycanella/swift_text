import { createContext, useContext } from 'react';

const PortalContainerContext = createContext<HTMLElement | null>(null);

function usePortalContainer(): HTMLElement | undefined {
  return useContext(PortalContainerContext) ?? undefined;
}

export { PortalContainerContext, usePortalContainer };
