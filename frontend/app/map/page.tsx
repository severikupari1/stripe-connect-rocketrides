"use client"
import * as React from 'react';
import {useState, useEffect, useMemo, useCallback} from 'react';
import {render} from 'react-dom';
import Map, {Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';
import GeoJson from './geojson-filtered.json';
import {dataLayer} from './map-style';
import {updatePercentiles} from './utils';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY; // Set your mapbox token here

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
      point: {x, y}
    } = event;
    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  const data = useMemo(() => {
    return allData
    // return allData && updatePercentiles(allData, f => f.properties.income[year]);
  }, [allData, year]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            <div>Postinumero: {hoverInfo.feature.properties.postinumeroalue}</div>
            <div>Nimi: {hoverInfo.feature.properties.nimi}</div>
            <div>Väkiluku: {(hoverInfo.feature.properties.he_vakiy)}</div>
          </div>
        )}
      </Map>

      <ControlPanel year={year} onChange={value => setYear(value)} />
    </>
  );
}

