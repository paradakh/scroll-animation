import { AnimatableOnScroll } from './interfaces';
export declare class Renderer {
    containers: AnimatableOnScroll[];
    constructor(containers: AnimatableOnScroll[]);
    render(): void;
    loop(): void;
}
