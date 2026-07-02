import ReactDOM from 'react-dom/client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PortalContainerContext } from '@/lib/portal-container';

import '@/assets/tailwind.css';

function ShadowDomSmokeTest({ container }: { container: HTMLElement }) {
  return (
    <PortalContainerContext.Provider value={container}>
      <div className="fixed right-4 bottom-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>SwiftText Shadow DOM smoke test</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Shadow DOM Dialog</DialogTitle>
              <DialogDescription>
                This dialog is portaled inside the Shadow DOM container, not document.body.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </PortalContainerContext.Provider>
  );
}

export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*.linkedin.com/*', '*://*.github.com/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    if (!import.meta.env.DEV) return;

    const ui = await createShadowRootUi(ctx, {
      name: 'swifttext-widget',
      position: 'overlay',
      anchor: 'body',
      alignment: 'bottom-right',
      zIndex: 2147483647,
      onMount: (uiContainer) => {
        const appRoot = document.createElement('div');
        uiContainer.append(appRoot);

        const root = ReactDOM.createRoot(appRoot);
        root.render(<ShadowDomSmokeTest container={uiContainer} />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
