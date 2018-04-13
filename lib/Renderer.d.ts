import { AnimatableOnScroll, Renderable } from './typings';
export declare class Renderer implements Renderable {
    containers: AnimatableOnScroll[];
    private lastTime;
    constructor(containers: AnimatableOnScroll[]);
    render(time: any): void;
    loop(): void;
}
