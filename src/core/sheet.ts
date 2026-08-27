import '../styles/sheet.css';

import { SheetArgs } from "../types";
import { createRoot } from "react-dom/client";
import { createElement, Fragment } from "react";

export class Sheet {

    static present<T = any>(args?: SheetArgs<T>): Promise<T | null | undefined> {

        return new Promise(

            (resolve, reject) => {

                if (typeof window === 'undefined') return reject(new Error('Window not available'));

                const surface = document.createElement('imperative-surface');

                document.body.appendChild(surface);

                const root = createRoot(surface);

                let panelRef: HTMLElement | null;

                let position = args?.position || 'auto';

                if (position == 'auto') position = window.matchMedia('(max-width: 1024px)').matches ? 'bottom' : 'right';

                if (!['right', 'left', 'top', 'bottom', 'auto'].includes(position)) position = 'auto';

                let size = args?.size || 'auto';

                if (!['small', 'medium', 'large', 'xlarge', 'full', 'auto'].includes(size)) size = 'auto';

                if (size == 'auto') size = window.matchMedia('(max-width: 1024px)').matches ? 'xlarge' : 'small';

                const pop = (value?: T | null) => {

                    if (panelRef?.getAttribute('data-state') == 'open') {

                        panelRef.addEventListener(
                            'animationend',
                            () => {
                                root.unmount();
                                surface.remove();
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
                        Fragment,
                        null,
                        createElement(
                            'surface-backdrop',
                            {
                                'onClick': () => (args?.barrierDismissible != false) && pop()
                            }
                        ),
                        createElement(
                            'surface-sheet',
                            {
                                'role': 'dialog',
                                'aria-modal': 'true',
                                'data-state': 'open',
                                'data-size': size,
                                'data-position': position,
                                'ref': (ref: HTMLElement) => (panelRef = ref),
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
                )
            }
        );
    }
}