
function mergerDefault(prev, next) {
  if (next) return next;
  return prev;
}

export function MapMerge(inputArray, Schema, uniqKey, state, convertFunc, mergerFunc) {
  let records = [];
  if (!convertFunc) records = inputArray.filter(one => one).map(one => new Schema(one));
  else records = inputArray.filter(one => one).map(one => convertFunc(one, Schema));
  return state.update('map', map => {
    records.forEach((record) => {
      if (!map.get(record[uniqKey])) { // set unknown record
        map = map.set(record[uniqKey], record);
      } else { // merge known record
        map = map.set(
          record[uniqKey],
          map.get(record[uniqKey]).mergeDeepWith(mergerFunc || mergerDefault, record)
        );
      }
    });
    return map;
  });
}

export function AddToMap(inputObject, Schema, uniqKey, state, convertFunc, mergerFunc) {
  let record = {};
  if (!convertFunc) record = new Schema(inputObject);
  else record = convertFunc(inputObject, Schema);
  if (!state.map.get(inputObject[uniqKey])) { // set unknown record
    return state.setIn(['map', record[uniqKey]], record);
  } // merge known record
  return state.updateIn(['map', record[uniqKey]], (old) =>
    old.mergeDeepWith(mergerFunc || mergerDefault, record)
  );
}
