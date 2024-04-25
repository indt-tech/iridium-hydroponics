import {Protofy} from 'protolib/base';
import lightAutoApi from "./lightAuto";
import buoyAutoApi from "./buoyAuto";
import phAutoApi from "./phAuto";
import nutrinetsAutoApi from "./nutrinetsAuto";
import TestApi from "./Test";
import FilltankApi from "./Filltank";
import Filltank2Api from "./Filltank2";
import Filltank3Api from "./Filltank3";
import TankfullApi from "./Tankfull";

const autoApis = Protofy("apis", {
    Test: TestApi,
    Filltank: FilltankApi,
    Filltank2: Filltank2Api,
    Filltank3: Filltank3Api,
    Tankfull: TankfullApi
})

export default (app, context) => {
    Object.keys(autoApis).forEach((k) => {
        autoApis[k](app, context)
    })
}