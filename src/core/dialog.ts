import '../styles/dialog.css';

import { DialogArgs } from "../types";
import { createRoot } from "react-dom/client";
import { createElement, Fragment } from "react";

export class Dialog {

    static present<T = any>(args?: DialogArgs<T>): Promise<T | null | undefined> {

        return new Promise(

            (resolve, reject) => {

                if (typeof window === 'undefined') return reject(new Error('Window not available'));

                const surface = document.createElement('imperative-surface');

                document.body.appendChild(surface);

                const root = createRoot(surface);

                let panelRef: HTMLElement | null;

                let size = args?.size || 'small';

                if (!['small', 'medium', 'large', 'xlarge'].includes(size)) size = 'small';

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
                }

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
                            'surface-dialog',
                            {
                                'role': 'dialog',
                                'aria-modal': 'true',
                                'data-state': 'open',
                                'data-size': size,
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