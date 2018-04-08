import { AnimatableOnScroll, Renderable } from './typings';
export declare class Renderer implements Renderable {
    containers: AnimatableOnScroll[];
    constructor(containers: AnimatableOnScroll[]);
    render(): void;
    loop(): void;
}
