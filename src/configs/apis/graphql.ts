import { gql } from "@apollo/client";

export default () => {
    return {
        getOnlineFlights: gql`
            query OnlineFlights {
                onlineFlights {
                    cid
                    name
                    callsign
                    server
                    latitude
                    longitude
                    altitude
                    groundspeed
                    transponder
                    heading
                    bank
                    pitch
                    session_id
                    logon_time
                    flight_plan {
                        flightRules
                        aircraft
                        departure
                        arrival
                        alternate
                        cruise_tas
                        altitude
                        deptime
                        enroute_time
                        fuel_time
                        remarks
                        route
                    }
                }
            }
        `
    }
}