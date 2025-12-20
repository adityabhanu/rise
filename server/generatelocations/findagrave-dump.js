// import fs from "fs";

// const ENDPOINT = "https://www.findagrave.com/orc/graphql";

// const HEADERS = {
//   "Content-Type": "application/json",
//   "Accept": "application/json"
// };

// const PERSISTED_QUERY = {
//   version: 1,
//   sha256Hash: "bfb78b85f6be61da441f58ab1e538e6b36ba50f5437b177f7826953eb9ee02c8"
// };

// // Call the API with given parents array
// async function browse(parents) {
//   const body = {
//     operationName: "browse",
//     variables: { parents },
//     extensions: { persistedQuery: PERSISTED_QUERY }
//   };

//   const res = await fetch(ENDPOINT, {
//     method: "POST",
//     headers: HEADERS,
//     body: JSON.stringify(body)
//   });

//   const json = await res.json();
//   return json?.data?.browse?.[0] || null;
// }

// // Recursively build the nested structure
// async function buildNested(parents) {
//   const data = await browse(parents);

//   if (!data || !data.locations || data.locations.length === 0) {
//     return data; // return as is if no children
//   }

//   // For each child location, recurse
//   const locations = [];
//   for (const loc of data.locations) {
//     // Recurse only if this location has an id
//     if (loc.id) {
//       const child = await buildNested([...parents, loc.id]);
//       // Keep all original fields but replace locations with nested children
//       locations.push({ ...loc, locations: child?.locations || [] });
//     } else {
//       // Leaf node
//       locations.push(loc);
//     }
//   }

//   return { ...data, locations };
// }

// (async () => {
//   console.log("Fetching fully nested Find A Grave hierarchy...");
//   const nestedData = await buildNested(["top"]);

//   fs.writeFileSync(
//     "findagrave-nested.json",
//     JSON.stringify(nestedData, null, 2)
//   );

//   console.log("✅ Nested JSON saved to findagrave-nested.json");
// })();

import fs from "fs";

const ENDPOINT = "https://www.findagrave.com/orc/graphql";

const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

const PERSISTED_QUERY = {
  version: 1,
  sha256Hash: "bfb78b85f6be61da441f58ab1e538e6b36ba50f5437b177f7826953eb9ee02c8"
};

async function browse(parents) {
  const body = {
    operationName: "browse",
    variables: { parents },
    extensions: { persistedQuery: PERSISTED_QUERY }
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body)
  });

  const json = await res.json();
  return json?.data?.browse?.[0] || null;
}

async function run() {
  const result = {
    id: "top",
    locations: []
  };

  // 1️⃣ First continent
  const top = await browse(["top"]);
  const continent = top?.locations?.[0];
  if (!continent) return;

  // 2️⃣ First country
  const continentNode = await browse(["top", continent.id]);
  const country = continentNode?.locations?.[0];
  if (!country) return;

  // 3️⃣ First state
  const countryNode = await browse(["top", continent.id, country.id]);
  const state = countryNode?.locations?.[0];
  if (!state) return;

  // 4️⃣ First county
  const stateNode = await browse([
    "top",
    continent.id,
    country.id,
    state.id
  ]);
  const county = stateNode?.locations?.[0];
  if (!county) return;

  // 5️⃣ First city
  const countyNode = await browse([
    "top",
    continent.id,
    country.id,
    state.id,
    county.id
  ]);
  const city = countyNode?.locations?.[0];

  // Build nested structure
  result.locations.push({
    ...continent,
    locations: [
      {
        ...country,
        locations: [
          {
            ...state,
            locations: [
              {
                ...county,
                locations: city ? [city] : []
              }
            ]
          }
        ]
      }
    ]
  });

  fs.writeFileSync(
    "findagrave-first-path-only.json",
    JSON.stringify({ data: { browse: [result] } }, null, 2)
  );

  console.log("✅ First-path-only JSON created");
}

run();


