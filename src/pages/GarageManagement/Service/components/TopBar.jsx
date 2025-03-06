import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TopBar = () => {
  const { garageId } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/garageManagement/${garageId}/createService`);
  };
  return (
    <div className=" py-3 px-4 bg-white  flex justify-end items-center  shadow-sm">
      <Button
        className=" flex justify-center items-center gap-2"
        onClick={handleClick}
      >
        <Plus size={20} />
        Create Service
      </Button>
    </div>
  );
};
