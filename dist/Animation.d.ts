import { Animatable, Updatable } from '../typings';
export declare class Animation implements Updatable, Animatable {
    element: HTMLElement | SVGElement;
    from: number;
    to: number;
    options: any;
    private style;
    private progress;
    private debounceId;
    easing: (n: number) => number;
    constructor(element: HTMLElement | SVGElement, from: number, to: number, options?: any);
    validateOption(option: string, placeholder: any): any;
    update(): void;
    render(): void;
    calcProgress(position: number): number;
    animate(position: number): void;
}
