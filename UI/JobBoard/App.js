import { useState, useEffect } from "react";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const LIMIT = 6;

function JobPosting({ job }) {
  return (
    <a className="job" href={job.url}>
      <h2 className="job__title">{job.title ?? "not specified"}</h2>
      <div className="job__info">
        <address rel="author">By {job.by ?? "unknown"}</address>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={new Date(job.time).toISOString()}>
          {new Date(job.time * 1000).toLocaleString() ?? "not specified"}
        </time>
      </div>
    </a>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [ids, setIds] = useState();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchIds() {
      try {
        const response = await fetch(`${BASE_URL}/jobstories.json`);
        const data = await response.json();
        setIds(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (!ids) {
      fetchIds();
    }
  }, []);

  useEffect(() => {
    if (ids) {
      handleLoadMore();
    }
  }, [ids]);

  async function handleLoadMore(limit = LIMIT) {
    if (!ids) return;
    try {
      setIsLoading(true);
      const currentIds = ids.slice(currentPage, currentPage + limit);

      const responses = await Promise.all(
        currentIds.map((id) => fetch(`${BASE_URL}/item/${id}.json`)),
      );
      const jobData = await Promise.all(
        responses.map((res) => {
          if (!res.ok) throw new Error(`Failed to fetch job ${res.url}`);
          return res.json();
        }),
      );

      setJobs((prev) => [...prev, ...jobData]);
      setCurrentPage((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const hasNextPage = currentPage > ids?.length;

  return (
    <div className="wrapper" aria-live="polite">
        <h1>Hacker New Jobs Board</h1>
      <ul className="jobs" aria-busy={isLoading}>
        {jobs?.map((job) => (
          <JobPosting key={job.id} job={job} />
        ))}
      </ul>
      {isLoading && <div className="loader">loading...</div>}
      <button
        className="std-button"
        onClick={() => handleLoadMore()}
        disabled={isLoading || hasNextPage}
      >
        Load More
      </button>
    </div>
  );
}
