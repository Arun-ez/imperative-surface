import '../styles/sheet.css';

import { SheetArgs } from "../types";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

export class Sheet {

    static present<T = any>(args?: SheetArgs<T>): Promise<T | null | undefined> {

        return new Promise(

            (resolve, reject) => {

                if (typeof window === 'undefined') return reject(new Error('Window not available'));

                const surface = document.createElement('imperative-surface');

                if (args?.barrierDismissible != false) surface.onclick = (event) => (event.target == surface) && pop();

                document.body.appendChild(surface);

                const root = createRoot(surface);

                let panelRef: HTMLElement | null;

                let position = args?.position || 'auto';

                if (!['right', 'left', 'top', 'bottom', 'auto'].includes(position)) position = 'auto';

                if (position == 'auto') position = window.matchMedia('(max-width: 1024px)').matches ? 'bottom' : 'right';

                let size = args?.size || 'auto';

                if (!['small', 'medium', 'large', 'xlarge', 'full', 'auto'].includes(size)) size = 'auto';

                if (size == 'auto') size = window.matchMedia('(max-width: 1024px)').matches ? 'full' : 'small';

                const previouslyFocusedElement: HTMLElement | null = document.activeElement instanceof HTMLElement ? document.activeElement : null;

                const pop = (value?: T | null) => {

                    if (panelRef?.getAttribute('data-state') == 'open') {

                        panelRef.addEventListener(
                            'animationend',
                            () => {
                                root.unmount();
                                surface.remove();
                                previouslyFocusedElement?.focus();
                                resolve(value);
                            },
                            {
                                once: true
                            }
                        );

                        panelRef.setAttribute('data-state', 'close');
                    }
                };

                root.render(
                    createElement(
                        'surface-sheet',
                        {
                            'role': 'dialog',
                            'tabIndex': -1,
                            'aria-modal': 'true',
                            'data-state': 'open',
                            'data-size': size,
                            'data-position': position,
                            'ref': (ref: HTMLElement) => {
                                panelRef = ref;
                                if (ref) ref.focus();
                            }
                        },
                        args?.body && createElement(
                            args.body,
                            {
                                pop: pop,
                                props: args?.props
                            }
                        )
                    )
                )
            }
        );
    }
}