declare module 'vanta/dist/vanta.fog.min' {
  interface VantaFogOptions {
    el: HTMLElement;
    THREE: any;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    zoom?: number;
    speed?: number;
  }

  interface VantaEffect {
    destroy: () => void;
    setOptions: (options: Partial<VantaFogOptions>) => void;
  }

  export default function FOG(options: VantaFogOptions): VantaEffect;
}

declare module 'vanta/dist/vanta.cells.min' {
  export default function CELLS(options: any): any;
}

declare module 'vanta/dist/vanta.halo.min' {
  export default function HALO(options: any): any;
}