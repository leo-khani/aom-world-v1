import BodyCard from "@/components/main/BodyCard";

interface Match {
  id: number;
  creator_profile_id: number;
  mapname: string;
  maxplayers: number;
  matchtype_id: number;
  options: string;
  slotinfo: string;
  description: string;
  startgametime: number;
  completiontime: number;
  observertotal: number;
  matchhistoryreportresults: MatchHistoryReportResult[];
  matchhistoryitems: any[]; // This array is empty in the example
  matchurls: MatchUrl[];
  matchhistorymember: MatchHistoryMember[];
}

interface MatchHistoryReportResult {
  matchhistory_id: number;
  profile_id: number;
  resulttype: number;
  teamid: number;
  race_id: number;
  xpgained: number;
  counters: string; // This is a JSON string
  matchstartdate: number;
  civilization_id: number;
}

interface MatchUrl {
  profile_id: number;
  url: string;
  size: number;
  datatype: number;
}

interface MatchHistoryMember {
  matchhistory_id: number;
  profile_id: number;
  race_id: number;
  statgroup_id: number;
  teamid: number;
  wins: number;
  losses: number;
  streak: number;
  arbitration: number;
  outcome: number;
  oldrating: number;
  newrating: number;
  reporttype: number;
  civilization_id: number;
}

export default function MatchPage() {
  return <BodyCard />;
}
