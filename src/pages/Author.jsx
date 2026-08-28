import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author");
        }

        const data = await response.json();

        setAuthor(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(author.address);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  if (loading) {
    return <AuthorSkeleton />;
  }

  if (error) {
    return (
      <div id="wrapper">
        <section aria-label="section">
          <div className="container text-center">
            <p>{error}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
            backgroundSize: "cover",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="d_profile de-flex"
                  data-aos="fade-up"
                  data-aos-duration="650"
                  data-aos-once="true"
                >
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage}
                        alt={author.authorName}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}

                          <span className="profile_username">
                            @{author.tag}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author.address}
                          </span>

                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={copyAddress}
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>

                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author.nftCollection}
                    authorImage={author.authorImage}
                    authorName={author.authorName}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const AuthorSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div
          className="skeleton"
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "0",
          }}
        ></div>

        <section aria-label="section">
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "50px",
              }}
            >
              <div
                className="skeleton"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              ></div>

              <div>
                <div
                  className="skeleton"
                  style={{
                    width: "180px",
                    height: "28px",
                    marginBottom: "12px",
                  }}
                ></div>

                <div
                  className="skeleton"
                  style={{
                    width: "280px",
                    height: "18px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;