import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { findFlight } from "../Services/FlightServices";
const ChooseFlight = ({ onChangeStep }) => {
  onChangeStep(0);
  const { departure, arrival, date } = useParams();
  const [listFlight, setListFlight] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await findFlight(
        departure,
        arrival,
        dayjs(date).format("YYYY-MM-DD HH:mm")
      );
      setListFlight(data);
      console.log(data[0].arrivalAirport.location);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <h1 className="text-center uppercase text-2xl font-bold mb-5">
          Chọn chuyến bay
        </h1>
        <div className="flex justify-center mb-10">
          <div className="h-[80px] bg-gray-400/30 rounded-md w-2/3 flex items-center gap-6 justify-center">
            <span className="font-bold text-2xl text-[#2D7690]">
              {listFlight.length > 0
                ? listFlight[0].departureAirport.location
                : ""}
            </span>
            <div className="flex gap-2 text-2xl">
              <FlightTakeoffIcon />
              <HorizontalRuleIcon />
              <HorizontalRuleIcon />
              <HorizontalRuleIcon />
              <div className="flex flex-col items-center">
                <i className="fa-solid fa-plane"></i>
                <span className="text-sm">
                  {listFlight.length > 0
                    ? dayjs(listFlight[0].arrivalTime).get("hour") -
                      dayjs(listFlight[0].departureTime).get("hour") +
                      "h" +
                      (dayjs(listFlight[0].arrivalTime).get("minute") -
                        dayjs(listFlight[0].departureTime).get("minute")) +
                      "'"
                    : ""}
                </span>
              </div>
              <HorizontalRuleIcon />
              <HorizontalRuleIcon />
              <HorizontalRuleIcon />
              <FlightLandIcon />
            </div>
            <span className="font-bold text-2xl text-[#2D7690]">
              {listFlight.length > 0
                ? listFlight[0].arrivalAirport.location
                : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          {listFlight.map((flight) => {
            return (
              <div className=" bg-[#2D7690] backdrop-blur-xl w-3/4 h-[150px] rounded-md shadow-lg shadow-[#2D7690]/50 flex text-white">
                <div className="w-1/3 h-[100%] flex flex-col items-center justify-center gap-1 text-gray-200">
                  <span>Mã chuyến bay: {flight.flightCode}</span>
                  <span>Máy bay: {flight.planeName}</span>
                  <span>Còn 8 ghế</span>
                  <span className="text-3xl font-bold text-yellow-200">
                    1.000.000vnd
                  </span>
                </div>
                <div className="w-2/3 h-[100%] flex justify-between items-center gap-3 p-10">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">
                      {dayjs(flight.departureTime).format("HH:mm")}
                    </span>
                    <span>{flight.departureAirport.airportName}</span>
                  </div>
                  <i className="fa-solid fa-arrow-right text-3xl"></i>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">
                      {dayjs(flight.arrivalTime).format("HH:mm")}
                    </span>
                    <span>{flight.arrivalAirport.airportName}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className=" bg-[#2D7690] backdrop-blur-xl w-3/4 h-[150px] rounded-md shadow-lg shadow-[#2D7690]/50 flex text-white">
            <div className="w-1/3 h-[100%] flex flex-col items-center justify-center gap-1 text-gray-200">
              <span>Mã chuyến bay: Sky1122RG</span>
              <span>Máy bay: AirbusA11</span>
              <span>Còn 8 ghế</span>
              <span className="text-3xl font-bold text-yellow-200">
                1.000.000vnd
              </span>
            </div>
            <div className="w-2/3 h-[100%] flex justify-between items-center gap-3 p-10">
              <div className="flex flex-col items-center">
                <span className="text-4xl">7:00</span>
                <span>Sân bay Tân Sơn Nhất</span>
              </div>
              <i className="fa-solid fa-arrow-right text-3xl"></i>
              <div className="flex flex-col items-center">
                <span className="text-4xl">10:00</span>
                <span>Sân bay Nội Bài</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseFlight;
