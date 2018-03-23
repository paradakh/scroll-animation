import { AnimatableOnScroll } from '../typings';
export declare class Renderer {
    containers: AnimatableOnScroll[];
    constructor(containers: AnimatableOnScroll[]);
    render(): void;
    loop(): void;
}
