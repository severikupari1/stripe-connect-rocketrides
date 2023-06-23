import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import Card from "../components/Card";
import GoogleMap from "../components/GoogleMap";
import { fetchHotels, FetchHotelsResponse } from "../services/fetchHotels";
import { Hotel } from "../types/hotel";

const query = () =>
  fetchHotels({
    checkIn: "2022-11-15",
    checkOut: "2022-11-16",
    locationId: 3000002244,
    rooms: 1,
  });

const Home: NextPage = () => {
  // const { data } = useQuery<FetchHotelsResponse>(["hotels"], query, {
  //   retry: false,
  // });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 52.5018,
    lng: 13.3856,
  });


  const [zoom, setZoom] = useState<number>(15);

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!);

    const nextCenter = map.getCenter();

    if (nextCenter) {
      setCenter(nextCenter.toJSON());
    }
  };

  const [highlightedHotel, setHighlightedHotel] = useState<Hotel | null>(null);

  const onMarkerClick = useCallback(
    (payload: Hotel) => {
      if (highlightedHotel === payload) {
        setHighlightedHotel(null);
      } else {
        setHighlightedHotel(payload);
      }
    },
    [highlightedHotel]
  );

  const hotels = {
    "offset": 0,
    "pageSize": 100,
    "totalSize": 521,
    "marketSize": 916,
    "sortType": "HDR",
    "tripFilterSummary": {
      "totalSizeFiltered": 7,
      "cityCounts": {
        "3000035821": 5,
        "5000348936": 2
      },
      "clusterCounts": {
        "910053504": 1,
        "910053506": 1,
        "910053538": 2,
        "910053550": 1,
        "910053826": 2
      },
      "amenityCounts": {
        "KITCHEN": 7,
        "KIDFRIEND": 1,
        "FBRKFST": 7,
        "SUSTAIN": 7,
        "FAMFRIEND": 5,
        "FITSPA": 3,
        "NSMKFAC": 7,
        "HANDFAC": 7,
        "PETALLOW": 5,
        "ADULTONLY": 2,
        "RESTRNT": 4,
        "FINTRNT": 7,
        "HEALTHSVCS": 7
      },
      "starRatingCounts": {
        "3.0": 2,
        "3.5": 5
      },
      "brandIdCounts": {
        "9": 3,
        "14702": 4
      },
      "propertyTypeCounts": {
        "204": 7
      },
      "propertyType": [
        {
          "typeId": "204",
          "typeTitle": "Hotels",
          "count": 7
        }
      ],
      "dealTypeCounts": {
        "EXPRESS_DEAL": 2
      },
      "minFilterPrice": "0.00",
      "maxFilterPrice": "500.0",
      "maxFilterPricePerStay": "500.0"
    },
    "cityInfo": {
      "cityId": 3000035821,
      "cityName": "Berlin",
      "stateName": "Berlin",
      "countryCode": "GM",
      "countryName": "Germany",
      "areaId": 20000,
      "lat": 52.46713638305664,
      "lon": 13.341763496398926,
      "zonePolygonInfo": {
        "53504": {
          "id": 53504,
          "type": "Z",
          "name": "Berlin Wall - Spree Riverbank - Ostbahnhof Area",
          "centerLat": 52.508918,
          "centerLon": 13.45307854,
          "viewOrder": 0,
          "polygonPoints": [
            {
              "latitude": 52.51635558,
              "longitude": 13.43878471
            },
            {
              "latitude": 52.51264702,
              "longitude": 13.47946846
            },
            {
              "latitude": 52.51233361,
              "longitude": 13.47946846
            },
            {
              "latitude": 52.50465428,
              "longitude": 13.4706279
            },
            {
              "latitude": 52.49979524,
              "longitude": 13.45380508
            },
            {
              "latitude": 52.49979524,
              "longitude": 13.45294677
            },
            {
              "latitude": 52.50245994,
              "longitude": 13.44341957
            },
            {
              "latitude": 52.5114309,
              "longitude": 13.42796235
            },
            {
              "latitude": 52.51243808,
              "longitude": 13.4283992
            },
            {
              "latitude": 52.51630334,
              "longitude": 13.43835556
            },
            {
              "latitude": 52.51635558,
              "longitude": 13.43878471
            }
          ]
        },
        "53506": {
          "id": 53506,
          "type": "Z",
          "name": "Mitte - Alexanderplatz - TV Tower Area",
          "centerLat": 52.52598326,
          "centerLon": 13.41330529,
          "viewOrder": 0,
          "polygonPoints": [
            {
              "latitude": 52.53755623,
              "longitude": 13.41355048
            },
            {
              "latitude": 52.53719079,
              "longitude": 13.41397964
            },
            {
              "latitude": 52.52888922,
              "longitude": 13.41479503
            },
            {
              "latitude": 52.52800153,
              "longitude": 13.41599666
            },
            {
              "latitude": 52.52502506,
              "longitude": 13.42307769
            },
            {
              "latitude": 52.52471173,
              "longitude": 13.43981467
            },
            {
              "latitude": 52.52418952,
              "longitude": 13.43972884
            },
            {
              "latitude": 52.5179747,
              "longitude": 13.43269073
            },
            {
              "latitude": 52.51583326,
              "longitude": 13.42642509
            },
            {
              "latitude": 52.51578103,
              "longitude": 13.42573844
            },
            {
              "latitude": 52.52225727,
              "longitude": 13.39835845
            },
            {
              "latitude": 52.52283173,
              "longitude": 13.3979293
            },
            {
              "latitude": 52.53562457,
              "longitude": 13.39475356
            },
            {
              "latitude": 52.5357812,
              "longitude": 13.39535438
            },
            {
              "latitude": 52.53755623,
              "longitude": 13.41294967
            },
            {
              "latitude": 52.53755623,
              "longitude": 13.41355048
            }
          ]
        },
        "53538": {
          "id": 53538,
          "type": "Z",
          "name": "Checkpoint Charlie - Gendarmenmarkt - Potsdamer Platz Area",
          "centerLat": 52.50866181,
          "centerLon": 13.38625457,
          "viewOrder": 0,
          "polygonPoints": [
            {
              "latitude": 52.51433117,
              "longitude": 13.37683446
            },
            {
              "latitude": 52.51558476,
              "longitude": 13.38550336
            },
            {
              "latitude": 52.51694276,
              "longitude": 13.38584669
            },
            {
              "latitude": 52.51736061,
              "longitude": 13.3951164
            },
            {
              "latitude": 52.51746506,
              "longitude": 13.39751966
            },
            {
              "latitude": 52.51725615,
              "longitude": 13.39794881
            },
            {
              "latitude": 52.50769703,
              "longitude": 13.40121038
            },
            {
              "latitude": 52.5002259,
              "longitude": 13.39082487
            },
            {
              "latitude": 52.49918088,
              "longitude": 13.37966688
            },
            {
              "latitude": 52.49949439,
              "longitude": 13.3788944
            },
            {
              "latitude": 52.51098811,
              "longitude": 13.36919553
            },
            {
              "latitude": 52.51145824,
              "longitude": 13.36945302
            },
            {
              "latitude": 52.51412224,
              "longitude": 13.37623365
            },
            {
              "latitude": 52.51433117,
              "longitude": 13.37683446
            }
          ]
        },
        "53550": {
          "id": 53550,
          "type": "Z",
          "name": "Kurfuerstendamm - Savignyplatz Area",
          "centerLat": 52.50440454,
          "centerLon": 13.30710642,
          "viewOrder": 0,
          "polygonPoints": [
            {
              "latitude": 52.50038265,
              "longitude": 13.33872564
            },
            {
              "latitude": 52.50017365,
              "longitude": 13.33863981
            },
            {
              "latitude": 52.49876287,
              "longitude": 13.33743818
            },
            {
              "latitude": 52.49690789,
              "longitude": 13.31649549
            },
            {
              "latitude": 52.49808359,
              "longitude": 13.30598123
            },
            {
              "latitude": 52.49489606,
              "longitude": 13.28804262
            },
            {
              "latitude": 52.49500057,
              "longitude": 13.28589685
            },
            {
              "latitude": 52.49531411,
              "longitude": 13.28478105
            },
            {
              "latitude": 52.50278608,
              "longitude": 13.28066118
            },
            {
              "latitude": 52.51218955,
              "longitude": 13.28649766
            },
            {
              "latitude": 52.5123985,
              "longitude": 13.28675516
            },
            {
              "latitude": 52.51349543,
              "longitude": 13.31829793
            },
            {
              "latitude": 52.51336485,
              "longitude": 13.31911333
            },
            {
              "latitude": 52.50688729,
              "longitude": 13.33267457
            },
            {
              "latitude": 52.5066522,
              "longitude": 13.33297498
            },
            {
              "latitude": 52.50518938,
              "longitude": 13.3319021
            },
            {
              "latitude": 52.50038265,
              "longitude": 13.33872564
            }
          ]
        },
        "53826": {
          "id": 53826,
          "type": "Z",
          "name": "Potsdam - Babelsberg Area",
          "centerLat": 52.39846286,
          "centerLon": 13.06862491,
          "viewOrder": 0,
          "polygonPoints": [
            {
              "latitude": 52.39429874,
              "longitude": 13.00207719
            },
            {
              "latitude": 52.39618424,
              "longitude": 13.00173387
            },
            {
              "latitude": 52.41796632,
              "longitude": 13.06524858
            },
            {
              "latitude": 52.41796632,
              "longitude": 13.06936845
            },
            {
              "latitude": 52.39660322,
              "longitude": 13.13185319
            },
            {
              "latitude": 52.39492725,
              "longitude": 13.13288316
            },
            {
              "latitude": 52.38549871,
              "longitude": 13.10919389
            },
            {
              "latitude": 52.38549871,
              "longitude": 13.04464921
            },
            {
              "latitude": 52.39429874,
              "longitude": 13.00207719
            }
          ]
        }
      }
    },
    "hotels": [
      {
        "pclnId": "C9EF0238168907F558B42FED62B391D4C06661E41B2541C7361FF49AD592A1407A138FB2AED8AE18C150F4DE89C348D7E9A39CE81336541899278E18BAE049114B046173E43B0248183A6360117BCFB1E209213891D758FAC3175F33AE764683ED927EEE92EA45901AF3FC590A2C9DE5",
        "hotelType": "SOPQ",
        "starRating": 3.5,
        "location": {
          "address": {
            "cityName": "Berlin",
            "countryName": "Germany",
            "isoCountryCode": "GM"
          },
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053538",
          "neighborhoodName": "Checkpoint Charlie - Gendarmenmarkt - Potsdamer Platz",
          "cityId": 3000035821,
          "zoneId": "53538",
          "zoneName": "Checkpoint Charlie - Gendarmenmarkt - Potsdamer Platz Area",
          "zoneType": "Z",
          "encLatLong": "46BFC7DD6B74E99B0441EA99BFADEBDD740708A9952173FC"
        },
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "RESTRNT",
            "PETALLOW",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN"
          ],
          "hotelAmenities": [
            {
              "code": "FBRKFST",
              "name": "Free Breakfast",
              "free": true
            },
            {
              "code": "FINTRNT",
              "name": "Free Internet Access",
              "free": true
            },
            {
              "code": "HEALTHSVCS",
              "name": "Health Services",
              "free": false
            },
            {
              "code": "KITCHEN",
              "name": "Kitchen/Kitchenette",
              "free": false
            },
            {
              "code": "RESTRNT",
              "name": "Restaurant",
              "free": false
            },
            {
              "code": "PETALLOW",
              "name": "Pets Allowed",
              "free": false
            },
            {
              "code": "HANDFAC",
              "name": "Handicapped Rooms/Facilities",
              "free": false
            },
            {
              "code": "NSMKFAC",
              "name": "No Smoking Rooms/Facilities",
              "free": false
            },
            {
              "code": "SUSTAIN",
              "name": "Sustainability",
              "free": false
            }
          ]
        },
        "overallGuestRating": 8,
        "totalReviewCount": 9700,
        "proximity": 4,
        "ratesSummary": {
          "minPrice": "111.00",
          "minCurrencyCode": "USD",
          "minStrikePrice": "143.98",
          "pclnId": "C9EF0238168907F558B42FED62B391D4C06661E41B2541C7361FF49AD592A1407A138FB2AED8AE18C150F4DE89C348D7E9A39CE81336541899278E18BAE049114B046173E43B0248183A6360117BCFB1E209213891D758FAC3175F33AE764683ED927EEE92EA45901AF3FC590A2C9DE5",
          "freeCancelableRateAvail": false,
          "payWhenYouStayAvailable": false,
          "minRatePromos": [
            {
              "type": "DISCOUNT",
              "title": "Save 23%! Best 3.5-star deal in this area.",
              "discountPercentage": 23,
              "showDiscount": true,
              "dealType": "DEAL_OF_DAY",
              "isVariableMarkupPromo": false
            }
          ],
          "gid": 3734,
          "rateIdentifier": "E40F07A182895C6F4614C0255B7101FA5EC6CAB247016DC041DBBCA260850FF0E345A53199B94A1DBB1BFE812134FE7B03B2B0EB54C7F7E97AA09DFCFA4AC386919343307112444431B40BDE01FD61D1BE1AA0191B562E9C472D387993A727C5B2B720555F8F71D4",
          "programName": "Express_Deal",
          "strikeThroughPrice": "143.98",
          "merchandisingFlag": true,
          "minRateSavingsPercentage": 23,
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false,
          "minRateStrikeThroughPrice": "144"
        },
        "allInclusiveRateProperty": false,
        "displayRank": 10000,
        "recmdScore": 0,
        "dealTypes": [
          "EXPRESS_DEAL"
        ],
        "bedChoiceAvailable": false,
        "merchandising": {},
        "globalDealScore": 0
      },
      {
        "hotelId": "1906704",
        "name": "Holiday Inn Express Berlin City Centre",
        "brand": "Holiday Inn Express",
        "starRating": 3.5,
        "location": {
          "address": {
            "addressLine1": "Stresemannstr. 49",
            "cityName": "Berlin",
            "countryName": "Germany",
            "zip": "10963",
            "isoCountryCode": "GM"
          },
          "longitude": 13.3856,
          "latitude": 52.5018,
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053538",
          "neighborhoodName": "Checkpoint Charlie - Gendarmenmarkt - Potsdamer Platz",
          "cityId": 3000035821,
          "zoneId": "53538"
        },
        "thumbnailUrl": "https://mobileimg.priceline.com/htlimg/1906/1906704/thumbnail-150-square.jpg",
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "RESTRNT",
            "PETALLOW",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN"
          ]
        },
        "overallGuestRating": 8.1,
        "totalReviewCount": 9706,
        "proximity": 3.022945261989437,
        "ratesSummary": {
          "minPrice": "143.99",
          "minCurrencyCode": "USD",
          "pclnId": "D42C33A38DAD33EB3F570716277B8BCCA9FD35759FF247F94CA8AF36933ABF26171A664BB93BAC23F51FA2B8EA1C9EC4497C84AE480E0934A668ED97069E2BCB78F63F5FC038B5BF4D8AE2F4EAA0BAD923762EA84CE754E6823F5F75195A36FC3F5A8FD75AAEFFB5",
          "freeCancelableRateAvail": true,
          "payWhenYouStayAvailable": true,
          "gid": 3139,
          "rateIdentifier": "DCC8FE1FAC1E0FFD56F2ACCBDA6F0646F6E79FBD921B85F81E43D6E02C70F9B0438F90117A30D0D791E23AE1AEF212C8852C1191FF93A428A64EB1400C8D913F01F481610E1EE31FDD7F0DD7F072B0ADFBE9D973D8216534914402C4610A287D",
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9999,
        "recmdScore": 0,
        "merchandising": {},
        "media": {
          "source": "fastly",
          "url": "https://mobileimg.pclncdn.com/htlimg/master/19/0/6/1906704/master_1906704"
        },
        "globalDealScore": 0
      },
      {
        "hotelId": "63243403",
        "name": "Hampton by Hilton Berlin City Centre Alexanderplatz",
        "brand": "Hampton Inn",
        "starRating": 3.5,
        "location": {
          "address": {
            "addressLine1": "Otto-Braun-Strasse 69",
            "cityName": "Berlin",
            "countryName": "Germany",
            "zip": "10178",
            "isoCountryCode": "GM"
          },
          "longitude": 13.418693,
          "latitude": 52.525,
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053506",
          "neighborhoodName": "Mitte - Alexanderplatz - TV Tower",
          "cityId": 3000035821,
          "zoneId": "53506"
        },
        "thumbnailUrl": "https://mobileimg.priceline.com/htlimg/63243/63243403/thumbnail-150-square.jpg",
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "RESTRNT",
            "FITSPA",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN",
            "FAMFRIEND",
            "KIDFRIEND"
          ]
        },
        "overallGuestRating": 8.1,
        "totalReviewCount": 14077,
        "proximity": 5.143524143181429,
        "ratesSummary": {
          "minPrice": "172.67",
          "minCurrencyCode": "USD",
          "pclnId": "91267DF85B247C70356FB65F2D529A43CD99783979108FD9AB2147699E3F8515CA233204BF2BB0A12DE4EFC08F8E60EE8F2CEF8B5010A3FB6001D2FBFC71E4FCAEF85B91C283D0B6",
          "freeCancelableRateAvail": true,
          "payWhenYouStayAvailable": true,
          "gid": 2281,
          "rateIdentifier": "E44DDF1E8E361D3D8FB67803DE8AD1F1A3C0E3F3FF82ED14BECAE5B4CF4108B61302CF305B6649DB14130E11AD016A7457BFF05D72F3E3C906B59B324F76A5FE",
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9998,
        "recmdScore": 0,
        "merchandising": {},
        "media": {
          "source": "fastly",
          "url": "https://mobileimg.pclncdn.com/htlimg/master/632/4/3/63243403/master_63243403"
        },
        "keyFeatures": [
          "clean"
        ],
        "globalDealScore": 0
      },
      {
        "hotelId": "10632805",
        "name": "Hampton By Hilton Berlin City West",
        "brand": "Hampton Inn",
        "starRating": 3.5,
        "location": {
          "address": {
            "addressLine1": "Uhlandstrasse 188-189",
            "cityName": "Berlin",
            "countryName": "Germany",
            "zip": "10623",
            "isoCountryCode": "GM"
          },
          "longitude": 13.32651,
          "latitude": 52.50491,
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053550",
          "neighborhoodName": "Kurfuerstendamm - Savignyplatz",
          "cityId": 3000035821,
          "zoneId": "53550"
        },
        "thumbnailUrl": "https://mobileimg.priceline.com/htlimg/10632/10632805/thumbnail-150-square.jpg",
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "FITSPA",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN",
            "FAMFRIEND"
          ]
        },
        "overallGuestRating": 8.2,
        "totalReviewCount": 7179,
        "proximity": 2.687651600985518,
        "ratesSummary": {
          "minPrice": "163.96",
          "minCurrencyCode": "USD",
          "pclnId": "1D03D6D9D9584CD4CC68FF09B5512F24275EE2B7EC2EA4CEAB2147699E3F8515F7F3A6B2A8C56B62F32A120367606CE57CE4F43CB5D27BA9A46AFCABDEB6073283DF297CF4AE52BC",
          "freeCancelableRateAvail": true,
          "payWhenYouStayAvailable": true,
          "gid": 2989,
          "rateIdentifier": "04DCA70163B97226BECACA5A4322319698E341879C7C2C7D513CC530D6942795A9F25B3A2D1285466E40598BC6A8469D42C5A16AB93D7DB0794A512F8B9E2702",
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9997,
        "recmdScore": 0,
        "merchandising": {},
        "media": {
          "source": "fastly",
          "url": "https://mobileimg.pclncdn.com/htlimg/master/106/3/2/10632805/master_10632805"
        },
        "keyFeatures": [
          "clean"
        ],
        "globalDealScore": 0
      },
      {
        "hotelId": "64417506",
        "name": "Hampton by Hilton Berlin City East Side Gallery",
        "brand": "Hampton Inn",
        "starRating": 3.5,
        "location": {
          "address": {
            "addressLine1": "Mildred-Harnack-Strasse 15",
            "cityName": "Berlin",
            "countryName": "Germany",
            "zip": "10243",
            "isoCountryCode": "GM"
          },
          "longitude": 13.440977,
          "latitude": 52.50494,
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053504",
          "neighborhoodName": "Berlin Wall - Spree Riverbank - Ostbahnhof",
          "cityId": 3000035821,
          "zoneId": "53504"
        },
        "thumbnailUrl": "https://mobileimg.priceline.com/htlimg/64417/64417506/thumbnail-150-square.jpg",
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "RESTRNT",
            "FITSPA",
            "PETALLOW",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN",
            "FAMFRIEND"
          ]
        },
        "overallGuestRating": 8.5,
        "totalReviewCount": 4846,
        "proximity": 4.924204090594547,
        "ratesSummary": {
          "minPrice": "244.03",
          "minCurrencyCode": "USD",
          "pclnId": "9D283D29BD4E00896103253D36B5200E4B2627C2F0B8640BAB2147699E3F8515413ADDBDC003CE08FC15C898F0FEA575643DE14ADB448EB76001D2FBFC71E4FCD2351AD038671130",
          "freeCancelableRateAvail": true,
          "payWhenYouStayAvailable": true,
          "gid": 2154,
          "rateIdentifier": "A2B1DA70F2265CB8B34E037ED01D69202B0AF449128CAFA0BECAE5B4CF4108B63FD64661028A9E2C2E2CF8EE8FB70D63388730B51E8123FAA2DFABDD7E2A3519",
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9996,
        "recmdScore": 0,
        "merchandising": {},
        "media": {
          "source": "fastly",
          "url": "https://mobileimg.pclncdn.com/htlimg/master/644/1/7/64417506/master_64417506"
        },
        "keyFeatures": [
          "clean"
        ],
        "globalDealScore": 0
      },
      {
        "hotelId": "168862203",
        "name": "Holiday Inn Express and Suites Potsdam",
        "brand": "Holiday Inn Express",
        "starRating": 3,
        "location": {
          "address": {
            "addressLine1": "AM Kanal 15",
            "cityName": "Potsdam",
            "countryName": "Germany",
            "zip": "14467",
            "isoCountryCode": "GM"
          },
          "longitude": 13.06200695,
          "latitude": 52.3979454,
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053826",
          "neighborhoodName": "Potsdam - Babelsberg",
          "cityId": 5000348936,
          "zoneId": "53826"
        },
        "thumbnailUrl": "https://mobileimg.priceline.com/htlimg/168862/168862203/thumbnail-150-square.jpg",
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "ADULTONLY",
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "PETALLOW",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN",
            "FAMFRIEND"
          ]
        },
        "overallGuestRating": 7.9,
        "totalReviewCount": 3322,
        "proximity": 12.717688167640707,
        "ratesSummary": {
          "minPrice": "104.76",
          "minCurrencyCode": "USD",
          "pclnId": "2353C87334C180E9953DABF929C37C65A464307F2A77CA0D8FEB6FED1C3151738B053EDEC1161325C4B644C22287E7621A9C9184810F1BE3AC2833E0264F817A91FC3642C41BAD4F7B19B2F07A63031B05DB29820061C0E9B66F02B4D045DAC78E5774F0D97B36B7408E232E179DAC6F",
          "freeCancelableRateAvail": true,
          "payWhenYouStayAvailable": true,
          "gid": 3468,
          "rateIdentifier": "87EA2A83B9FCC5AA2DF9F7B5C4EB28AA404CC1037284E508C26B3A10190CE28FCFD79C342974872B0EF12C59E318A47741AAA030AC36FEF45EDE865ACC41EF681B9612E07F4DBD527E666732130685ADB87B9B45B4C184E1F0BC6ACA693609EF",
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9995,
        "recmdScore": 0,
        "merchandising": {},
        "media": {
          "source": "fastly",
          "url": "https://mobileimg.pclncdn.com/htlimg/master/1688/6/2/168862203/master_168862203"
        },
        "keyFeatures": [
          "clean"
        ],
        "globalDealScore": 0
      },
      {
        "pclnId": "F75341B5DBE778E895BC7559980A41C0DFBDF84FC3212F9F9098EB03252A832EDEF1402DEA80ECF29540FE06C644379F10CE1D1E62E1CECE170A90470225A8CDD723530B645745CDFC867EAB4273D4F278A5D46DC3F61D41ED927EEE92EA45904EEF2A50A5DB1165F7F42ECB7E8DD5EE",
        "hotelType": "SOPQ",
        "starRating": 3,
        "location": {
          "address": {
            "cityName": "Potsdam",
            "countryName": "Germany",
            "isoCountryCode": "GM"
          },
          "timeZone": "Europe/Berlin",
          "neighborhoodId": "910053826",
          "neighborhoodName": "Potsdam - Babelsberg",
          "cityId": 5000348936,
          "zoneId": "53826",
          "zoneName": "Potsdam - Babelsberg Area",
          "zoneType": "Z",
          "encLatLong": "68861697BDC357509BF3AA3B5AE2A6DC5142FCFE75A1FB58134BEF0CCB5FF1D1"
        },
        "hotelFeatures": {
          "hotelAmenityCodes": [
            "ADULTONLY",
            "FBRKFST",
            "FINTRNT",
            "HEALTHSVCS",
            "KITCHEN",
            "PETALLOW",
            "HANDFAC",
            "NSMKFAC",
            "SUSTAIN",
            "FAMFRIEND"
          ],
          "hotelAmenities": [
            {
              "code": "ADULTONLY",
              "name": "Adult Only",
              "free": false
            },
            {
              "code": "FBRKFST",
              "name": "Free Breakfast",
              "free": true
            },
            {
              "code": "FINTRNT",
              "name": "Free Internet Access",
              "free": true
            },
            {
              "code": "HEALTHSVCS",
              "name": "Health Services",
              "free": false
            },
            {
              "code": "KITCHEN",
              "name": "Kitchen/Kitchenette",
              "free": false
            },
            {
              "code": "PETALLOW",
              "name": "Pets Allowed",
              "free": false
            },
            {
              "code": "HANDFAC",
              "name": "Handicapped Rooms/Facilities",
              "free": false
            },
            {
              "code": "NSMKFAC",
              "name": "No Smoking Rooms/Facilities",
              "free": false
            },
            {
              "code": "SUSTAIN",
              "name": "Sustainability",
              "free": false
            },
            {
              "code": "FAMFRIEND",
              "name": "Family Friendly",
              "free": false
            }
          ]
        },
        "overallGuestRating": 7,
        "totalReviewCount": 3300,
        "proximity": 16,
        "ratesSummary": {
          "minPrice": "81.00",
          "minCurrencyCode": "USD",
          "minStrikePrice": "104.77",
          "pclnId": "F75341B5DBE778E895BC7559980A41C0DFBDF84FC3212F9F9098EB03252A832EDEF1402DEA80ECF29540FE06C644379F10CE1D1E62E1CECE170A90470225A8CDD723530B645745CDFC867EAB4273D4F278A5D46DC3F61D41ED927EEE92EA45904EEF2A50A5DB1165F7F42ECB7E8DD5EE",
          "freeCancelableRateAvail": false,
          "payWhenYouStayAvailable": false,
          "roomLeft": 2,
          "gid": 3268,
          "rateIdentifier": "1E0E845298B2E0A2620DD35AC1B880E13FB53CCF33E770FDD348D987BCEF0DA33C9B15F36F5B6464E93DA6AA721C4EFC03B2B0EB54C7F7E97AA09DFCFA4AC386919343307112444433DA503C14022681BC4BE7FD7F54118B08B36B4734209B6A9F1EF070813EB8D0",
          "programName": "Express_Deal",
          "strikeThroughPrice": "104.77",
          "merchandisingFlag": true,
          "minRateSavingsPercentage": 23,
          "ccNotRequiredAvailable": false,
          "applePayRateAvailable": false,
          "minRateStrikeThroughPrice": "105"
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9994,
        "recmdScore": 0,
        "dealTypes": [
          "EXPRESS_DEAL"
        ],
        "bedChoiceAvailable": false,
        "merchandising": {},
        "keyFeatures": [
          "clean"
        ],
        "globalDealScore": 0
      }
    ]
  }

  return (
    <div>
      <Head>
        <title>Google Maps Marker Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen relative">
          <GoogleMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            center={center}
            zoom={zoom}
            markers={hotels.hotels as unknown as Hotel[]}
            onIdle={onIdle}
            onMarkerClick={onMarkerClick}
            highlightedMarkerId={highlightedHotel?.hotelId}
          />
        </div>
        <div>
          {highlightedHotel && (
            <Card
              name={highlightedHotel.name}
              stars={highlightedHotel.starRating}
              imgUrl={highlightedHotel.thumbnailUrl}
              address={`${highlightedHotel.location.address.addressLine1}, ${highlightedHotel.location.address.cityName}`}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
