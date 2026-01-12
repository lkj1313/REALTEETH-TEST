import { useQuery } from "@tanstack/react-query";
import { getCoordinatesByAddress } from "@/entities/location";

export const useCoordinates = (address: string) => {
  return useQuery({
    queryKey: ["coordinates", address],
    queryFn: () => getCoordinatesByAddress(address),
    enabled: !!address.trim(),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });
};
