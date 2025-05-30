import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { countryList } from "../constants/countryList";

const RotatingGlobe = () => {
  const [totalVibeCount, setTotalVibeCount] = useState(0);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const size = Math.min(width, 600); // Max size = 600
        setDimensions({ width: size, height: size });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous render

    const projection = d3
      .geoOrthographic()
      .scale(width / 2.2)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath(projection);
    const globe = svg.append("g");

    // Draw water
    globe
      .append("circle")
      .attr("fill", "#d0e7f9")
      .attr("stroke", "#000")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale());

    // Load countries
    d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    ).then((worldData) => {
      const countries = feature(
        worldData,
        worldData.objects.countries
      ).features;

      const countryPaths = globe
        .selectAll("path.country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("fill", "#13ad5e")
        .attr("stroke", "#fff")
        .attr("d", path)
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#ffcc00");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#13ad5e");
        });

      const timer = d3.timer((elapsed) => {
        const rotate = [elapsed * 0.02, -10];
        projection.rotate(rotate);
        countryPaths.attr("d", path);
      });

      return () => timer.stop();
    });
  }, [dimensions]);

  useEffect(() => {
    const total = countryList.reduce(
      (sum, country) => sum + Number(country.vibe),
      0
    );
    setTotalVibeCount(total);
  }, []);

  return (
    <div className="w-[90%] md:w-2/5 mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg mb-8 mt-4 hover:border-green-500 border-transparent border-b-4 hover:shadow-2xl">
      <h1 className="text-center py-4 text-2xl bg-white/50 rounded-xl">
        VIBE World Domination
      </h1>
      <div
        ref={containerRef}
        style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <h1 className="text-center py-4 text-2xl bg-white/50 rounded-xl">
        <span>Total Vibe Count: </span>
        {totalVibeCount}
      </h1>
    </div>
  );
};

export default RotatingGlobe;
