const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

export const getCoordinatesByAddress = async (address: string) => {
  const cleanAddress = address.replace(/-/g, " ");

  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      cleanAddress
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${kakaoRestApiKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("카카오 API 호출에 실패했습니다.");
  }

  const data = await response.json();

  if (data.documents.length === 0) {
    throw new Error("해당 장소의 정보가 제공되지 않습니다.");
  }

  const document = data.documents[0];

  return {
    lat: Number(document.y), // 위도
    lon: Number(document.x), // 경도
  };
};
