import { apiData } from "@/config/api";
import { Spinner } from "@nextui-org/react";
import { IconQuestionMark } from "@tabler/icons-react";
import React from "react";

export const CountryFlagByUserId: React.FC<{
  profileId?: string;
}> = ({ profileId }) => {
  const [flagUrl, setFlagUrl] = React.useState<string>("");
  const [countryCode, setCountryCode] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const fetchPlayerData = async (): Promise<any | null> => {
    try {
      setLoading(true);
      const response = await fetch(`${apiData.public.getPlayerSteam}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: profileId,
        }),
      });

      const result = await response.json();

      if (result) {
        setFlagUrl(result.country);
        setCountryCode(result.profiles[0].country);
      } else {
        setFlagUrl("");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      return [null]; // Ensure fallback to nulls if error occurs
    }
  };

  React.useEffect(() => {
    fetchPlayerData();
  }, [profileId]);

  if (loading) {
    return (
      <div>
        <Spinner color="success" size="sm" />
      </div>
    );
  }

  if (!flagUrl) {
    return (
      <div className="bg-neutral-800 rounded-sm w-7 flex justify-center items-center">
        <IconQuestionMark size={18} />
      </div>
    );
  }

  return (
    <div className="">
      <img
        src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
        alt="Country Flag"
        className="rounded-sm"
      />
    </div>
  );
};
