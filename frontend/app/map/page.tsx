"use client"
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { Layer, Popup, Source, useMap } from 'react-map-gl';
import GeoJson from './geojson-filtered.json';
import { dataLayer } from './map-style';
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import GeoCoding from "../search/page";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY; // Set your mapbox token here
function NewComponent(props: { hoverInfo: any }) {
    // @ts-ignore
    return <div onChange={(e) => {
        console.log(e)
    }} className="tooltip" style={{ left: props.hoverInfo.x, top: props.hoverInfo.y, position: "absolute" }}>
        <div>Postinumero: {props.hoverInfo.feature.properties.postinumeroalue}</div>
        <div>Nimi: {props.hoverInfo.feature.properties.nimi}</div>
        <div>Henkilömäärä: {props.hoverInfo.feature.properties.he_vakiy}</div>
    </div>;
}

export default function Page() {
    const [year, setYear] = useState(2015);
    const [allData, setAllData] = useState(null);
    const [hoverInfo, setHoverInfo] = useState(null);

    useEffect(() => {
        /* global fetch */
        setAllData(GeoJson)
    }, []);

    const onHover = useCallback(event => {
        const {
            features,
            point: { x, y }
        } = event;
        const hoveredFeature = features && features[0];
        // prettier-ignore
        setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    }, []);

    const data = useMemo(() => {
        return allData
        // return allData && updatePercentiles(allData, f => f.properties.income[year]);
    }, [allData, year]);

    return (
        <NoSSR>
            <>
                <Map
                    initialViewState={{
                        latitude: 66.52093619837372,
                        longitude: 25.642473273233154,
                        zoom: 10
                    }}
                    // {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    interactiveLayerIds={['data']}
                    onMouseMove={onHover}
                    id={"map"}
                >
                    <Source type="geojson" data={data}>
                        <Layer {...dataLayer} />
                    </Source>
                    {hoverInfo && (
                        <NewComponent hoverInfo={hoverInfo} />
                    )}
                    <GeoCoding></GeoCoding>
                    {/*<NavigateButton />*/}
                </Map>

                {/*<ControlPanel year={ year } onChange={ value => setYear(value) }/>*/}
            </>
        </NoSSR>
    );
}


function NavigateButton() {
    const { current: map } = useMap();

    return <button style={{
        position: "fixed",
        top: 200
    }} onClick={() => {
        map.flyTo({ center: [-122.4, 37.8] });
    }}>Go</button>;
}
