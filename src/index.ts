import './surface.css';

import type { ReactElement } from 'react';

import type {
    SheetArgs,
    DialogArgs,
    SurafaceBodyProps,
    SurafaceHeaderProps,
    SurafaceContentProps,
    SurafaceFooterProps,
    SurfaceContext
} from "./types";

import { createRoot } from "react-dom/client";
import { createElement, Fragment } from "react";

export class Surface {

    static Sheet = class {

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

                        if (!panelRef) return;

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

    static Dialog = class {

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

                        if (!panelRef) return;

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

    static Body = ({ children, className, disabled, onSubmit }: SurafaceBodyProps): ReactElement => {

        const tag = typeof onSubmit === 'function' ? 'form' : 'div';

        const props: any = {
            'aria-busy': disabled,
            'className': className,
            'data-slot': 'surface-body'
        };

        if (typeof onSubmit === 'function') {
            props.onSubmit = onSubmit;
        }

        return createElement(tag, props, children);
    }

    static Header = ({ leading, title, trailing, children, centerTitle, onPop, className }: SurafaceHeaderProps): ReactElement => {

        return createElement(
            'div',
            {
                'data-slot': 'surface-header'
            },
            children ? (
                createElement(
                    'div',
                    {
                        className: className
                    },
                    children
                )
            ) : (
                createElement(
                    'div',
                    {
                        'data-slot': 'surface-header-default',
                        'className': className
                    },
                    createElement(
                        'div',
                        null,
                        leading || (onPop ? createElement(
                            'span',
                            {
                                'data-slot': 'close-icon',
                                'onClick': () => onPop()
                            },
                            createElement(
                                'svg',
                                {
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    width: '20',
                                    height: '20',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    strokeWidth: '2',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round'
                                },
                                createElement('path', { d: 'M18 6 6 18' }),
                                createElement('path', { d: 'm6 6 12 12' })
                            )
                        ) : null)
                    ),
                    createElement(
                        'div',
                        {
                            'data-center': centerTitle === true ? 'true' : 'false'
                        },
                        title
                    ),
                    createElement(
                        'div',
                        null,
                        trailing
                    )
                )
            )
        );
    }

    static Content = ({ children, className }: SurafaceContentProps): ReactElement => {

        return createElement(
            'div',
            {
                'data-slot': 'surface-content',
                className: className
            },
            children
        );
    }

    static Footer = ({ children, className }: SurafaceFooterProps): ReactElement => {

        return createElement(
            'div',
            {
                'data-slot': 'surface-footer'
            },
            createElement(
                'div',
                {
                    className: className
                },
                children
            )
        );
    }
}

export type { SheetArgs, DialogArgs, SurfaceContext }