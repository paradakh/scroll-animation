import { AnimatableOnScroll, Updatable, Renderable } from './typings';
export declare class Renderer implements Renderable {
    containers: (AnimatableOnScroll & Updatable)[];
    private lastTime;
    constructor(containers: (AnimatableOnScroll & Updatable)[]);
    render(time: any): void;
    update(): void;
    loop(): void;
}
