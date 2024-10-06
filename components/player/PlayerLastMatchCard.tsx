import { MatchHistory } from "@/types/getPlayerMatchHistoryTypes";
import { IconSword } from "@tabler/icons-react";
import React from "react";
import ImageMap, { formatMapNameText } from "../tools/ImageMap";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface PlayerLastMatchCardProps {
  lastMatch: MatchHistory | null;
  secondLastMatch: MatchHistory | null;
}
const PlayerLastMatchCard: React.FC<PlayerLastMatchCardProps> = ({
  lastMatch,
  secondLastMatch,
}) => {
  if (!lastMatch) {
    return (
      <div className="bg-secondary rounded-lg p-4">
        {/* Title */}
        <div className="flex gap-2 items-center">
          <IconSword size={18} />
          <h1>Leatest Matches</h1>
        </div>
      </div>
    );
  }

  if (!secondLastMatch) {
    return (
      <div className="bg-secondary rounded-lg p-4">
        {/* Title */}
        <div className="flex gap-2 items-center">
          <IconSword size={18} />
          <h1>Leatest Matches</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-secondary rounded-lg p-4 w-full">
      {/* Title */}
      <div className="flex flex-col gap-2 items-center">
        <IconSword size={18} />
        <h1>Leatest Matches</h1>

        {/* Matches */}
        <div className="">
          <Table
            aria-label="Example static collection table"
            className="w-full"
            width={"w-full"}
          >
            <TableHeader>
              <TableColumn>Map / Mode / Duration</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Rating Δ</TableColumn>
              <TableColumn>Team(s)</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    <ImageMap mapname={lastMatch.mapname} />
                    <div className="flex flex-col gap-2">
                      <div className="uppercase text-xs">
                        {lastMatch.description}
                      </div>
                      <div>{formatMapNameText(lastMatch.mapname)}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    <ImageMap mapname={secondLastMatch.mapname} />
                    <div>{formatMapNameText(secondLastMatch.mapname)}</div>
                  </div>
                </TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PlayerLastMatchCard;
