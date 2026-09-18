import '../styles/dialog.css';

import { DialogArgs } from "../types";
import { createElement, Fragment } from "react";
import { createRoot } from "react-dom/client";

export class Dialog {

    static present<T = any>(args?: DialogArgs<T>): Promise<T | null | undefined> {

        return new Promise(

            (resolve, reject) => {

                if (typeof window === 'undefined') return reject(new Error('Window not available'));

                const surface = document.createElement('div');

                surface.dataset.slot = 'surface-root';

                document.body.appendChild(surface);

                const root = createRoot(surface);

                let panelRef: HTMLElement | null;

                let size = args?.size || 'small';

                if (!['small', 'medium', 'large', 'xlarge'].includes(size)) size = 'small';

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
                }

                root.render(
                    createElement(
                        Fragment,
                        null,
                        createElement(
                            'div',
                            {
                                'data-slot': 'surface-backdrop',
                                'onClick': () => (args?.barrierDismissible != false) && pop()
                            }
                        ),
                        createElement(
                            'div',
                            {
                                'role': 'dialog',
                                'tabIndex': -1,
                                'aria-modal': 'true',
                                'data-state': 'open',
                                'data-slot': 'surface-dialog',
                                'data-size': size,
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
                )
            }
        );
    }
}