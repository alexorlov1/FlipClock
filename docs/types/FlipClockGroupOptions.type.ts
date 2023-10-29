type FlipClockGroupOptions = {
    el?: Element | null;
    label?: string;
    depth?: number;
    children: ((parent: Element) => Element[]);
};