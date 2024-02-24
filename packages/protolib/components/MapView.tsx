import { Paragraph, Stack, StackProps, Text, XStack, YStack } from "tamagui"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { DataViewContext } from "./DataView"
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { useThemeSetting } from '@tamagui/next-theme'
import Center from "./Center"
import { EditableObject } from "./EditableObject";
import { getPendingResult } from "../base/PendingResult";
import { Tinted } from "./Tinted";
import { useTint } from "../lib/Tints";

export const MapView = ({ ...props }: any & StackProps) => {
  const { resolvedTheme } = useThemeSetting()
  const containerRef = useRef(null)
  const data = useContext<any>(DataViewContext);
  const { tint } = useTint()

  const [popupInfo, setPopupInfo] = useState<any>({ location: { lat: '', lon: '' } });


  const locationItems = data.items.data.items.map(item => {
    const modelItem = data.model.load(item)
    return {
      modelItem,
      location: modelItem.getLocation()
    }
  }).filter(item => item.location)


  const pins = useMemo(
    () =>
      locationItems.map((item, index) => (
        <Marker
          color={"var(--"+tint+"10)"}
          key={`marker-${index}`}
          longitude={item.location.lon}
          latitude={item.location.lat}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(item);
          }}
        >
        </Marker>
      ))
    , [data.items.data.items, tint]
  );

  const width = 300

  // console.log('tint: ', tint)
  return (
    <Stack ref={containerRef} f={1}{...props}>
      {(process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== "PUT_HERE_YOUR_API_KEY") ?
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapLib={import('mapbox-gl')}
          initialViewState={{
            latitude: 41.3947846,
            longitude: 2.1939663,
            zoom: 12
          }}
          style={{}}
          //mapStyle="mapbox://styles/mapbox/streets-v9"
          mapStyle={(resolvedTheme == 'dark') ? 'mapbox://styles/mapbox/dark-v9' : "mapbox://styles/mapbox/light-v9"}
        >
          <GeolocateControl position="top-right" />
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <Tinted>
            {pins}
          </Tinted>


          {popupInfo && popupInfo.modelItem && (
            <Popup
              style={{ minWidth: (width + 20) + "px" }}
              anchor="top"
              longitude={Number(popupInfo.location.lon)}
              latitude={Number(popupInfo.location.lat)}
              onClose={() => setPopupInfo({ location: { lat: '', lon: '' } })}
              closeButton={false}
            >
              <XStack f={1} ai="center">
                <EditableObject
                  initialData={getPendingResult("loaded", popupInfo.modelItem.read())}
                  name={popupInfo.modelItem.getId()}
                  spinnerSize={15}
                  loadingText={<YStack ai="center" jc="center">Loading data...<Paragraph fontWeight={"bold"}></Paragraph></YStack>}
                  objectId={popupInfo.modelItem.getId()}
                  sourceUrl={data.sourceUrl + '/' + popupInfo.modelItem.getId()}
                  mode={'preview'}
                  model={data.model}
                  extraFields={data.extraFields}
                  icons={data.icons}
                  customFields={data.customFields}
                  columnWidth={width - 30}
                  onDelete={data.onDelete}
                  deleteable={data.deleteable}
                  extraMenuActions={data.extraMenuActions}
                />
              </XStack>
            </Popup>

          )}
        </Map> : <Text>Mapview is disabled: Missing mapbox api key</Text>
      }
    </Stack >)
}
