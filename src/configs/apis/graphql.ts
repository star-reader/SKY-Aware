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
                        flight_rules
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
        `,
        getOnlineControllers: gql`
            query OnlineControllers {
                onlineControllers {
                    cid
                    name
                    callsign
                    frequency
                    latitude
                    longitude
                    facility
                    rating
                    server
                    visual_range
                    text_atis
                    session_id
                    logon_time
                }
            }
        `
    }
}