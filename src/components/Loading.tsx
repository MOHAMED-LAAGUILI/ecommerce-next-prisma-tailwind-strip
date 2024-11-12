"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full ">
      <Loader2 className="size-28 animate-spin" />
    </div>
  );
};

export default Loading;
