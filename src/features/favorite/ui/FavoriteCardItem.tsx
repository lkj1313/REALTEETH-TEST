import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/entities/weather";
import {
  getCoordinatesByAddress,
  type Coords,
  type FavoriteLocation,
} from "@/entities/location";
import { FavoriteCard } from "@/entities/location";

interface Props {
  fav: FavoriteLocation;
  onRemove: (path: string) => void;
  onRename: (path: string, name: string) => void;
}

export const FavoriteCardItem = ({ fav, onRemove, onRename }: Props) => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    getCoordinatesByAddress(fav.fullPath).then(setCoords);
  }, [fav.fullPath]);

  const { data, isLoading } = useWeatherQuery(
    coords?.lat ?? null,
    coords?.lon ?? null
  );
  const displayName = fav.nickname || fav.fullPath.split("-").pop() || "";

  if (isLoading || !data) {
    return (
      <FavoriteCard
        isLoading
        displayName=""
        temp={0}
        tempMin={0}
        tempMax={0}
        weatherIcon=""
        onRemove={() => {}}
        onRename={() => {}}
        onClick={() => {}}
      />
    );
  }

  return (
    <FavoriteCard
      displayName={displayName}
      temp={data.current.main.temp}
      tempMin={data.current.main.temp_min}
      tempMax={data.current.main.temp_max}
      weatherIcon={data.current.weather[0].icon}
      onRemove={(e) => {
        e.stopPropagation();
        onRemove(fav.fullPath);
      }}
      onRename={(newName) => onRename(fav.fullPath, newName)}
      onClick={() =>
        navigate(
          `/detail/${coords?.lat}/${coords?.lon}/${encodeURIComponent(
            displayName
          )}`
        )
      }
    />
  );
};
