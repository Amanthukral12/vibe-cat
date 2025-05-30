import { useEffect, useRef, useState } from "react";
import { countryList } from "../constants/countryList";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type {
  GeoJsonProperties,
  Feature,
  Geometry,
  FeatureCollection,
} from "geojson";
const RotatingGlobe = () => {
  const [totalVibeCount, setTotalVibeCount] = useState(0);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const size = Math.min(width, 600);
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
    let timer: d3.Timer;

    d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    ).then((worldData) => {
      const world = worldData as Topology;
      const geo = feature(world, world.objects.countries) as
        | FeatureCollection<Geometry, GeoJsonProperties>
        | Feature<Geometry, GeoJsonProperties>;

      let countries: Feature<Geometry, GeoJsonProperties>[] = [];

      if (geo.type === "FeatureCollection") {
        countries = geo.features;
      } else {
        countries = [geo]; // If it's a single feature, wrap it in an array
      }

      const countryPaths = globe
        .selectAll("path.country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("fill", "#13ad5e")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("d", path)
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#ffcc00");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#13ad5e");
        });

      // Rotation animation
      timer = d3.timer((elapsed) => {
        const rotate: [number, number, number] = [elapsed * 0.02, -10, 0]; // speed of rotation
        projection.rotate(rotate);
        countryPaths.attr("d", path); // update shapes
      });
    });

    return () => timer?.stop();
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
