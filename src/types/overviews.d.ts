interface Overviews {
  [key: string]: Overview;
}

interface Overview {
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
  radar_zoom?: number;
}
