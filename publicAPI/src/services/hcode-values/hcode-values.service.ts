import { Injectable } from '@nestjs/common';

import { HCodeValue } from "src/models/hCodeValue.type";
import { ColorScheme } from "src/models/colorScheme.model"


@Injectable()
export class HCodeValuesService {
  getColor(colors: ColorScheme[], value: HCodeValue): string {
    let hexcode = "";
    for (let i=0; i < colors.length; i++){
      if(colors[i]["hCodeValue"] === Number(value)){
        hexcode = colors[i]["hexcode"];
      }
    }

    if(hexcode){
      return hexcode;
    }
    else{
      return "Error! color not found for " + value;
    }
  }

}
