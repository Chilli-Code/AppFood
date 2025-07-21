declare module '@mapbox/polyline' {
  export function decode(str: string): Array<[number, number]>;
  export function encode(points: Array<[number, number]>): string;
}
