import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PortfolioIsotope = ({ noViewMore, projectCategories, projects }) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      //    layoutMode: "fitRows",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    return () => isotope.current.destroy();
  });
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  console.log({ projectCategories });
  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          {projectCategories?.map((category) => {
            return (
              <a
                className={`c-pointer lui-subtitle ${activeBtn(
                  `sorting-${category}`
                )}`}
                onClick={handleFilterKeyChange(`sorting-${category}`)}
                data-href={`.sorting-${category}`}
              >
                {category}
              </a>
            );
          })}
        </div>
        <div className="works-items works-masonry-items row">
          {projects
            ?.filter((project) => project.enabled)
            .sort((a, b) => a.sequence - b.sequence)
            .map((project) => {
              let category = "";
              project.techStack.forEach((tech) => {
                category = category + " " + `sorting-${tech.trim()}`;
              });
              console.log({ category });
              return (
                <div
                  className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${category}`}
                >
                  <div
                    className="works-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="image">
                      <div className="img">
                        <Link legacyBehavior href="/work-single">
                          <a>
                            <img
                              decoding="async"
                              src={project.image.url}
                              alt="Zorro"
                            />
                            <span className="overlay" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="desc">
                      <div className="flex-row mb-10">
                        {project.techStack.map((tech) => {
                          return <span className="category">{tech}</span>;
                        })}
                      </div>
                      <h5 className="name">
                        <Link legacyBehavior href="/work-single">
                          <a>{project.title}</a>
                        </Link>
                      </h5>
                      <div className="text">
                        <p>
                          {project.description ||
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
                        </p>
                      </div>
                      <div className="portfolio__link-container">
                        <a
                          href={project.liveurl}
                          className="portfolio__link-wrapper"
                        >
                          <span className="portfolio__link">Live</span>
                          <img src="assets/images/live-arrow.png" />
                        </a>
                        <a
                          href={project.githuburl}
                          className="portfolio__link-wrapper"
                        >
                          <span className="portfolio__link">Github</span>
                          <img src="assets/images/github.png" />
                        </a>
                      </div>
                    </div>
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: "url(assets/images/pat-2.png)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default PortfolioIsotope;
