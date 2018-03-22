import { PositionFn, Updatable, WithPositionGetter } from './interfaces';
export declare class Position implements WithPositionGetter, Updatable {
    element: HTMLElement;
    fromFn: PositionFn;
    toFn: PositionFn;
    from: number;
    to: number;
    private debounceId;
    constructor(element: HTMLElement, fromFn: PositionFn, toFn: PositionFn);
    update(): void;
    getPosition(scroll: number): number;
}
