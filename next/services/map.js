import request from '../hooks/request';
import { GOOGLE_API_KEY } from '../config';

export const getPlacesAutocomplete = async(address) => {
  const reply = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&components=country:ph`)
  const result = await reply.json()
  if (result.status === 'OK') {
    return result.predictions
  } else {
    return []
  }
}

export const searchAddress = async(address) => {
  const reply = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&sensor=false&components=country:PH`)
  const result = await reply.json()
  if (result.status === 'OK') {
    return result.results.map(r => parseAddress(r))
  } else {
    return []
  }
}

export const searchPlaces = async(address) => {
  const reply = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&sensor=false&components=country:PH`)
  const result = await reply.json()
  if (result.status === 'OK') {
    return result.results.map(r => ({
      id: r.place_id,
      name: r.name,
      address: r.formatted_address,
      latitude: r.geometry.location.lat,
      longitude: r.geometry.location.lng
    }))
  } else {
    return []
  }
}

export const getPlace = async(placeId) => {
  const reply = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY}`)
  const result = await reply.json()
  console.log("PLACE", result)
  if (result.status === 'OK') {
    return parseAddress(result.result)
  } else {
    return false
  }
}

export const getAddressByPoint = async({ latitude, longitude }) => {
  const reply = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`)
  const result = await reply.json()
  if (result.status === 'OK') {
    return parseAddress(result.results[0])
  } else {
    return false
  }
}

export const getDirection = async({ origin, destination }) => {
  const waypoints = [origin, destination].join('|')
  const reply = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=optimize:true|${waypoints}&mode=driving&region=ph&key=${GOOGLE_API_KEY}`)
  const result = await reply.json()
  console.log("STEPS", result)

  if (result.status === 'OK') {
    const steps = result.routes[0].legs[0].steps
    return steps
  } else {
    return false
  }
}

export const parseAddress = (address) => {
  const { lat, lng } = address.geometry.location

  let details = {
    name: address.name,
    address: address.formatted_address,
    latitude: lat,
    longitude: lng,
    location: [lng, lat],
    street: ''
  }

  if (address.address_components && address.address_components.length > 0) {
    address.address_components.map(c => {
      switch (c.types[0]) {
        case 'country':
          details.country = c.long_name
          break;
        case 'administrative_area_level_1':
          details.stateOrProvince = c.long_name
          break;
        case 'city':
        case 'locality':
          details.city = c.long_name
          break;
        case 'neighborhood':
          details.barangay = c.long_name
          break;
        case 'street_number':
          details.street = c.long_name
          break;
        case 'route':
          details.street = `${details.street} ${c.long_name}`
          break;
        default:
          if (c.types.length > 1 && c.types[1] == 'sublocality') {
            details.barangay = c.long_name
          }
      }
    })
  }

  return details
}
