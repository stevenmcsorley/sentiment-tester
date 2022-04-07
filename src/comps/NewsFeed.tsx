import React, { useEffect, useState } from "react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

import RepositoryFactory from "../api/repoFactory";
const NewsApi: any = RepositoryFactory.get("newsApi");

interface Items {
  [x: string]: any;
  id: string;
  timestamp_date: string;
  total: number;
  ticker: string;
  likes: number;
  retweets: number;
  user_followers: number;
  user_tweet_count: number;
  RHI: number;
  AHI: number;
  total_tweet_volume: number;
}

const NewsFeed = () => {
  const [query, setQuery] = useState<{ results: Items[] }>({
    results: [],
  });

  // const [isError, setIsError] = useState(false);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    // setIsError(false);
    setIsLoading(true);

    /// strip out to a service
    const convertTime = (days: number = 2) => {
        let date: any = new Date();
        var yesterday: any = date - 1000 * 60 * 60 * 24 * days;
        yesterday = new Date(yesterday);
        return { today: date, daysAgo: yesterday };
      };
    
      const Query = {
        endpoint: "trending",
        start: convertTime(1).daysAgo,
        end: convertTime().today,
        limit: 250,
      };

    const fetchData = async () => {
      const result = await NewsApi.getTrending(Query);
      setQuery(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  /// strip out to a service
  const sortTrends = (sort_direction = "desc", obj_key = "AHI") => {
    console.log("click", sort_direction);
    if (sort_direction === "asc") {
      setQuery({
        results: query.results.sort(
          (a: Items, b: Items) => a[obj_key] - b[obj_key]
        ),
      });
    } else {
      setQuery({
        results: query.results.sort(
          (a: Items, b: Items) => b[obj_key] - a[obj_key]
        ),
      });
    }
  };

  console.log(query);
  const feed = query.results.map(
    (item, index) =>
      !isLoading && (
        <div key={index}>
          <div className="dev-card-base dev-flex-column dev-u-padding-default">
            <div className="dev-card-base__header dev-u-padding-default">
              <h4 className="dev-u-padding-vertical card-title capitalize">
                {item.ticker}
              </h4>
            </div>
            <div className="dev-card-base__body dev-card-base__body--grow dev-u-padding-default dev-u-align-left ">
              <div
                className={`dev-grid-wrapper__div--column--2 dev-u-margin-default`}
              >
                <div>
                  <p>User tweet count</p>
                </div>
                <div>
                  <p>{item.user_followers}</p>
                </div>
                <div>
                  <p>Tweet Likes</p>
                </div>
                <div>
                  <p>{item.likes}</p>
                </div>
                <div>
                  <p>Average Hype Index</p>
                </div>
                <div>
                  <p>{item.AHI}</p>
                </div>
                <div>
                  <p>Relative Hype Indexx</p>
                </div>
                <div>
                  <p>{item.RHI}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  );

  return (
    <div>
      <h4 className="dev-u-padding-vertical card-title capitalize">
        TRENDING SENTIMENT
      </h4>
      <div className="dev-card-base dev-flex-column dev-u-padding-default">
        <div className="dev-card-base__header dev-u-padding-default">
          <div className={`dev-grid-wrapper__div--column--12 dev-full-width`}>
            <div className="dev-u-margin-default dev-u-padding-default">
              <p className="dev-u-flex-default dev-u-margin-small">
                Likes
                <span>
                  <span>
                    <BiSortDown
                      onClick={() => sortTrends("asc", "likes")}
                      className="dev-u-margin-small"
                    />
                  </span>
                  <span>
                    <BiSortUp
                      onClick={() => sortTrends("desc", "likes")}
                      className="dev-u-margin-small"
                    />
                  </span>
                </span>
              </p>
            </div>
            <div className="dev-u-margin-default dev-u-padding-default">
              <p className="dev-u-flex-default dev-u-margin-small">
                AHI
                <span>
                  <span>
                    <BiSortDown
                      onClick={() => sortTrends("asc", "AHI")}
                      className="dev-u-margin-small"
                    />
                  </span>
                  <span>
                    <BiSortUp
                      onClick={() => sortTrends("desc", "AHI")}
                      className="dev-u-margin-small"
                    />
                  </span>
                </span>
              </p>
            </div>
            <div className="dev-u-margin-default dev-u-padding-default">
              <p className="dev-u-flex-default dev-u-margin-small">
                RHI
                <span>
                  <span>
                    <BiSortDown
                      onClick={() => sortTrends("asc", "RHI")}
                      className="dev-u-margin-small"
                    />
                  </span>
                  <span>
                    <BiSortUp
                      onClick={() => sortTrends("desc", "RHI")}
                      className="dev-u-margin-small"
                    />
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`dev-grid-wrapper__div--column--3`}>{feed}</div>
    </div>
  );
};

export default NewsFeed;
