"use client"

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center mt-96">
      <Loader2 className=" size-28 animate-spin" />
    </div>
  );
};

export default Loading;
