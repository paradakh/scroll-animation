import { PositionFn, Updatable, WithPositionGetter } from './typings';
export declare class Position implements WithPositionGetter, Updatable {
    element: HTMLElement;
    fromFn: PositionFn;
    toFn: PositionFn;
    from: number;
    to: number;
    constructor(element: HTMLElement, fromFn: PositionFn, toFn: PositionFn);
    update(): void;
    getPosition(scroll: number): number;
}
