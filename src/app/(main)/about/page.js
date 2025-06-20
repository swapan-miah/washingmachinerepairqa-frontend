import React from "react";
import AboutData from "../../../../lib/AboutData";
import Contact from "@/components/Contact";
import Map from "@/components/Map";
import OurTeam from "@/components/OurTeam";
import WhyChooseUs from "@/components/WhyChooseUs";
import SchemaScript from "@/components/SchemaScript";

export async function generateMetadata() {
  const data = await AboutData();

  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.keywords || "",
    robots: data?.index === "index" ? "index, follow" : "noindex, nofollow",
    openGraph: {
      title: data?.title,
      description: data?.description,
    },
  };
}

const Page = async () => {
  const data = await AboutData();

  return (
    <>
      {data?.schema && <SchemaScript schema={data.schema} id="about" />}
      <OurTeam />
      <WhyChooseUs />
      <Contact />
      <Map />
    </>
  );
};

export default Page;
