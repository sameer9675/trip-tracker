import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParam] = useSearchParams(); //destructuring   [searchParam, setSearchParam]

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return [lat, lng];
}
