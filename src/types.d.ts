interface FlightPlan {
  flight_rules: string;
  aircraft: string;
  departure: string;
  arrival: string;
  alternate: string;
  cruise_tas: string;
  altitude: string;
  deptime: string;
  enroute_time: string;
  fuel_time: string;
  remarks: string;
  route: string;
}

interface OnlineController {
  cid: string;
  name: string;
  callsign: string;
  frequency: string;
  latitude: number;
  longitude: number;
  facility: number;
  rating: number;
  server: string;
  visual_range: number;
  text_atis: string[];
  session_id: string;
  logon_time: string;
}

interface OnlineFlight {
  cid: string;
  name: string;
  callsign: string;
  server: string;
  latitude: number;
  longitude: number;
  altitude: number;
  groundspeed: number;
  transponder: number;
  heading: number;
  bank: number;
  pitch: number;
  session_id: string;
  logon_time: string;
  flight_plan: FlightPlan;
}