import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export type TransportationType = "bus" | "flight" | "train" | "rental";

interface UseTransportationSearchReturn {
  // State
  activeTab: TransportationType;
  departurePoint: string;
  destination: string;
  departureDate: Dayjs | null;
  returnDate: Dayjs | null;
  showReturnDate: boolean;

  // Actions
  setActiveTab: (tab: TransportationType) => void;
  setDeparturePoint: (point: string) => void;
  setDestination: (dest: string) => void;
  setDepartureDate: (date: Dayjs | null) => void;
  setReturnDate: (date: Dayjs | null) => void;
  setShowReturnDate: (show: boolean) => void;
  handleSwap: () => void;
  handleSearch: () => void;
  handleRemoveReturnDate: () => void;
}

export const useTransportationSearch = (): UseTransportationSearchReturn => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get URL parameters
  const urlType = searchParams.get("type") as TransportationType;
  const urlDeparturePoint = searchParams.get("departurePoint");
  const urlDestination = searchParams.get("destination");
  const urlDepartureDate = searchParams.get("departureDate");
  const urlReturnDate = searchParams.get("returnDate");

  // Initialize state from URL or defaults
  const [activeTab, setActiveTab] = useState<TransportationType>(
    urlType || "bus"
  );
  const [showReturnDate, setShowReturnDate] = useState(!!urlReturnDate);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(
    urlDepartureDate ? dayjs(urlDepartureDate) : dayjs("2025-11-09")
  );
  const [returnDate, setReturnDate] = useState<Dayjs | null>(
    urlReturnDate ? dayjs(urlReturnDate) : null
  );
  const [departurePoint, setDeparturePoint] = useState(
    urlDeparturePoint || "Hà Nội"
  );
  const [destination, setDestination] = useState(urlDestination || "Hải Phòng");

  // Sync state when URL parameters change
  useEffect(() => {
    if (urlType) {
      setActiveTab(urlType);
    }
    if (urlDeparturePoint) {
      setDeparturePoint(urlDeparturePoint);
    }
    if (urlDestination) {
      setDestination(urlDestination);
    }
    if (urlDepartureDate) {
      setDepartureDate(dayjs(urlDepartureDate));
    }
    if (urlReturnDate) {
      setReturnDate(dayjs(urlReturnDate));
      setShowReturnDate(true);
    } else {
      setReturnDate(null);
      setShowReturnDate(false);
    }
  }, [
    urlType,
    urlDeparturePoint,
    urlDestination,
    urlDepartureDate,
    urlReturnDate,
  ]);

  const handleSwap = () => {
    const temp = departurePoint;
    setDeparturePoint(destination);
    setDestination(temp);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", activeTab);
    params.set("departurePoint", departurePoint);
    params.set("destination", destination);

    if (departureDate) {
      params.set("departureDate", departureDate.format("YYYY-MM-DD"));
    }

    if (returnDate) {
      params.set("returnDate", returnDate.format("YYYY-MM-DD"));
    }

    navigate(`/search?${params.toString()}`);
  };

  const handleRemoveReturnDate = () => {
    setShowReturnDate(false);
    setReturnDate(null);
  };

  return {
    activeTab,
    departurePoint,
    destination,
    departureDate,
    returnDate,
    showReturnDate,
    setActiveTab,
    setDeparturePoint,
    setDestination,
    setDepartureDate,
    setReturnDate,
    setShowReturnDate,
    handleSwap,
    handleSearch,
    handleRemoveReturnDate,
  };
};
