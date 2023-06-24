function requireGlobal(packageName) {
  var childProcess = require('child_process');
  var path = require('path');
  var fs = require('fs');

  var globalNodeModules = childProcess.execSync('npm root -g').toString().trim();
  var packageDir = path.join(globalNodeModules, packageName);
  if (!fs.existsSync(packageDir))
    packageDir = path.join(globalNodeModules, 'npm/node_modules', packageName); //find package required by old npm

  if (!fs.existsSync(packageDir))
    throw new Error('Cannot find global module \'' + packageName + '\'');

  var packageMeta = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json')).toString());
  var main = path.join(packageDir, packageMeta.main);

  if (packageName === 'axios') {
    main = path.join(packageDir, '/dist/node/axios.cjs');
  }

  return require(main);
}

const proj4 = requireGlobal('proj4');

(() => {

// Define the projection definitions
  proj4.defs([
    [
      'EPSG:3067',
      '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs'
    ],
    [
      'EPSG:4326',
      '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
    ]
  ]);

// Function to convert EPSG:3067 to EPSG:4326
  function convertToWGS84(easting, northing) {
    const convertedCoordinates = proj4('EPSG:3067', 'EPSG:4326', [ easting, northing ]);
    const latitude = convertedCoordinates[1];
    const longitude = convertedCoordinates[0];
    return { latitude, longitude };
  }

  const sample = require('./features.json');
  let dataToFile = {}
  let counter = 0
  sample["features"].forEach((element, index) => {
    counter++
    const properties = element["properties"];
    const geometry = element["geometry"];
    // console.log(`${properties["nimi"]} ${properties["postinumeroalue"]}`)

    element["geometry"]["coordinates"][0][0].forEach((point, index) => {
      const convertedCoords = convertToWGS84(point[0], point[1]);
      point[0] = convertedCoords.longitude
      point[1] = convertedCoords.latitude
    });
    console.log(counter)
  })
  const fs = require('fs')

  const filtered = sample["features"].filter((element => {
    return [ '96500', '96190' ].includes(element["properties"]["postinumeroalue"])
  }))

  const filteredGeoJson = {
    "type": "FeatureCollection",
    "features": filtered
  }


  // Write data in 'Output.txt' .
  fs.writeFile('geojson-filtered.json', JSON.stringify(filteredGeoJson), (err) => {

    // In case of a error throw err.
    if (err) throw err;
  })
  // console.log(JSON.stringify(dataToFile['96500'].coordinates))

  // Requiring fs module in which

})();