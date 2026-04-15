import "./styles.css";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const LIMIT = 6;

(() => {
  // Write some JavaScript here.
  const state = {
    currentPage: 0,
    ids: "",
    isLoading: false,
  };

  const jobsList = document.querySelector(".jobs");
  const loader = document.querySelector(".loader");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  fetchIds();

  loadMoreBtn.addEventListener("click", handleLoadMore);

  function handleLoadMore() {
    if (!state.ids || state.currentPage >= state.ids.length) {
      loadMoreBtn.disabled = true;
      return;
    }
    fetchJobs();
  }

  async function fetchIds() {
    try {
      const response = await fetch(`${BASE_URL}/jobstories.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const ids = await response.json();
      state.ids = ids;
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchJobs() {
    if (!state.ids) return;

    try {
      setLoading("on");

      const ids = state.ids.slice(state.currentPage, state.currentPage + LIMIT);

      const responses = await Promise.all(
        ids.map((id) =>
          fetch(`${BASE_URL}/item/${id}.json`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ),
      );

      const jobData = await Promise.all(
        responses.map((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch job ${res.url}`);
          }
          return res.json();
        }),
      );

      jobData.forEach((job) => renderJobPosting(job));

      state.currentPage += LIMIT;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading("off");
    }
  }

  function setLoading(mode) {
    if (mode === "on") {
      state.isLoading = true;
      jobsList.setAttribute("aria-busy", true);
      loader.textContent = "Loading...";
      loadMoreBtn.disabled = true;
    }
    if (mode === "off") {
      state.isLoading = false;
      jobsList.setAttribute("aria-busy", false);
      loader.textContent = "";

      const noMore = state.currentPage >= state.ids.length;
      loadMoreBtn.disabled = noMore;
    }
  }

  function renderJobPosting(job) {
    const { url, time, title, by } = job;

    const anchor = document.createElement("a");
    anchor.setAttribute("class", "job");
    anchor.setAttribute("href", url);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "job__title");
    h2.textContent = title;

    anchor.appendChild(h2);

    const info = document.createElement("div");
    info.setAttribute("class", "job__info");

    const author = document.createElement("span");
    author.textContent = `by ${by}`;

    info.appendChild(author);

    const dot = document.createElement("span");
    dot.setAttribute("aria-hidden", "true");
    dot.innerHTML = "&middot;";

    info.appendChild(dot);

    const timeTag = document.createElement("time");
    const currentTime = new Date(time * 1000);
    timeTag.setAttribute("datetime", currentTime.toISOString());
    timeTag.setAttribute(
      "aria-label",
      `Posted on ${currentTime.toLocaleString()}`,
    );
    timeTag.textContent = currentTime.toLocaleString();

    info.appendChild(timeTag);

    anchor.appendChild(info);

    jobsList.appendChild(anchor);
  }
})();
