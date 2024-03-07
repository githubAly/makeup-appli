import { useQuery } from "@tanstack/react-query";

async function fetchData() {
  const result = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json`);
  const json = await result.json();
  return json;
}

export function useMakeup() {
  return useQuery({ queryKey: ["makeup"], queryFn: fetchData} );
}
