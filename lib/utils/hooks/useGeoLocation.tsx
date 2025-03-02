
export default async function useGeoLocation() {
  const res = await fetch('http://ip-api.com/json');
  if (res.status === 200) {
    const data = await res.json();

    if(data.countryCode!=="IL"){
      throw new Error('Access alowed only in Israel')
    }
  }
}
