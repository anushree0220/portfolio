import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Layout from "../src/layouts/Layout";
import { getUserData } from "../lib/api";
import PreLoader from "../src/layouts/PreLoader";
const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const Works = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectCategories, setProjectCategories] = useState([]);
  console.log({ userData });

  let fetchUser = async () => {
    try {
      let response = await getUserData();
      console.log({ response });
      if (response.success && Object.keys(response.user).length > 0) {
        setUserData({
          ...response.user,
          projectCategories: filterProjectCategories(response.user),
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error while fetching User", error);
      setError(true);
      setIsLoading(false);
    }
  };

  let Error = () => {
    return (
      <div className="container align-center titles">
        <div className="lui-subtitle">
          <span>
            {" "}
            OOP's, <b>Try Again!</b>
          </span>
        </div>
      </div>
    );
  };

  let filterProjectCategories = (user) => {
    let categories = [];
    user.projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        !categories.includes(tech.trim()) && categories.push(tech.trim());
      });
    });
    return categories;
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, []);

  if (isLoading) return <PreLoader />;
  if (error) return <Error />;
  return (
    <Layout>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          {/* Heading */}
          <div className="m-titles align-center">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Portfolio </span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Cases</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Works */}
      <section className="lui-section">
        {/* Works */}
        <div className="v-line v-line-right v-line-top">
          <div className="container">
            <PortfolioIsotope
              noViewMore
              projectCategories={projectCategories}
              projects={userData.projects}
            />
            <div className="lui-bgtitle">
              <span> Portfolio </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Works;
