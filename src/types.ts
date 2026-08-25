import type { ReactNode, SubmitEventHandler, ComponentType } from 'react';

/**
 * The context passed to any component rendered inside a Surface (Sheet or Dialog).
 */
export interface SurfaceContext<T = any> {
    /** Closes the surface and resolves the promise with the given value */
    pop: (value?: T | null) => void;
    /** Optional data passed down from the present() arguments */
    props?: any;
}

export interface SurfaceArgs<T = any> {
    /**
     * React component to render inside the Surface.Sheet.
     * Receives pop() and props.
    */
    body?: ComponentType<SurfaceContext<T>>;

    /**
     * Optional props passed to the body component.
     */
    props?: any;

    /**
     * Indicates whether the sheet should be dismissed when the user
     * taps or clicks outside of it (on the backdrop).
     * @default true
     */
    barrierDismissible?: boolean;
}

export interface SheetArgs<T = any> extends SurfaceArgs<T> {
    /**
     * Controls the sheet size.
     * @default auto
     */
    size?: 'small' | 'medium' | 'large' | 'xlarge' | 'full' | 'auto';

    /**
     * Controls the sheet position.
     * @default auto
     */
    position?: 'right' | 'left' | 'top' | 'bottom' | 'auto';
}

export interface DialogArgs<T = any> extends SurfaceArgs<T> {
    /**
     * Controls the dialog size.
     * @default small
     */
    size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export interface SurafaceBodyProps {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    onSubmit?: SubmitEventHandler<HTMLFormElement>;
}

export interface SurafaceHeaderProps {
    /** Optional content to display on the left side (overrides the default close button) */
    leading?: ReactNode;
    /** The main title of the header */
    title?: ReactNode;
    /** Optional content to display on the right side */
    trailing?: ReactNode;
    /** If provided, completely overrides the default layout of the header */
    children?: ReactNode;
    /** Whether to center the title text */
    centerTitle?: boolean;
    /** If provided, renders a default close 'X' button on the left that calls this function */
    onPop?: () => void;
    className?: string;
}

export interface SurafaceContentProps {
    children?: ReactNode;
    className?: string;
}

export interface SurafaceFooterProps {
    children?: ReactNode;
    className?: string;
}