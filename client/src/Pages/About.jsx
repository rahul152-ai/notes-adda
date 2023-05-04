import React, { useState } from "react";

const About = () => {
  const [spin, setSpin] = useState(true);
  return (
    <>
      <div className="">
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-purple-500 border-t-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default About;
