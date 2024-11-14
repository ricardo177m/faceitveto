interface Overviews {
  [key: string]: {
    pos_x: number;
    pos_y: number;
    scale: number;
    offsets?: {
      lowerz: number;
      zoom: number;
      lower: {
        x: number;
        y: number;
      };
      upper: {
        x: number;
        y: number;
      };
    };
  };
}
