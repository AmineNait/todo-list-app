declare module "react-slick" {
  import * as React from "react";

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    initialSlide?: number;
    responsive?: Array<{
      breakpoint: number;
      settings: Settings;
    }>;
    // Ajoutez d'autres paramètres de configuration que vous utilisez
  }

  export class Slider extends React.Component<Settings> {}
  export default Slider;
}
