import { Animatable, AnimatableOnScroll, Updatable, WithPositionGetter } from '../typings';
export declare class Container implements Updatable, AnimatableOnScroll {
    position: WithPositionGetter & Updatable;
    parts: (Animatable & Updatable)[];
    progress: (scroll: number) => number;
    private lastPosition;
    constructor(position: WithPositionGetter & Updatable, parts?: (Animatable & Updatable)[]);
    animate(scroll?: number): void;
    update(): void;
}
