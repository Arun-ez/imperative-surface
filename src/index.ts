import './styles/base.css';

import type { ReactElement } from 'react';

import type {
    SurafaceBodyProps,
    SurafaceHeaderProps,
    SurafaceContentProps,
    SurafaceFooterProps,
} from "./types";

import { createElement } from "react";

import { Sheet } from './core/sheet';
import { Dialog } from './core/dialog';

export class Surface {

    static Sheet = Sheet;
    static Dialog = Dialog;

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

export type { SheetArgs, DialogArgs, SurfaceContext } from './types';