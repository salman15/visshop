import { useEffect, useRef, useState } from "react";
import { JobProps } from "../interfaces/Jobs.Interface";
import {
  createSearchUrl,
  PageMeta,
  QueryProps,
  ResponseProps
} from "../pages/vacatures";
import { useFilterAction } from "../redux/actions/useFilterAction";
import useGet from "./useGet";
//
const renderPages: any = (array: any[]) => {
  let pagesArray: any = [];
  array.forEach((job, index) => {
    if (index % 12 === 0) {
      pagesArray = [...pagesArray, [job]];
    } else {
      pagesArray[pagesArray.length - 1] = [
        ...pagesArray[pagesArray.length - 1],
        job
      ];
    }
  });
  return pagesArray;
};

//
const useJobs = (
  jobs: JobProps[],
  searchParams: string,
  locationParam,
  distanceParam,
  query?: QueryProps,
  pageMeta?: PageMeta
) => {
  //
  const [showFilters, setShowFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedPage, setSelectedPage] = useState(
    query ? query.page : pageMeta ? pageMeta?.current_page : 1
  );
  const [pageData, setPageData] = useState(pageMeta);
  const [pages, setPages] = useState([[]]);
  const [page1, setPage1] = useState([]);
  const [page2, setPage2] = useState([]);
  const timeout = useRef<any>();

  const {
    selectedFilters,
    setFilters,
    addFilter,
    addObjectFilter,
    removeFilter,
    removeObjectFilter
  } = useFilterAction();

  const { response, get, loading, error } = useGet(
    `api/v1/jobs/pages?page=${selectedPage}`
  );

  const searchJobs = () => {
    const createFilterUrl = () => {
      return `
        &categories=${selectedFilters.category
          .map((item, i) => `${item}`)
          .toString()
          .trim()}
        &experiences=${selectedFilters.experiences
          .map((item, i) => `${item.filter}`)
          .toString()
          .replace(/\s/g, "")}
        &types=${selectedFilters.types
          .map((item) => `${item.filter}`)
          .toString()
          .replace(/\s/g, "")}
        &provinces=${selectedFilters.regions
          .map((item, i) => `${item}`)
          .toString()
          .trim()}
        &radius=${selectedFilters.radius}
        &min_salary=${selectedFilters.salary?.min
          ?.toString()
          .replace(/\s/g, "")}
        &max_salary=${selectedFilters.salary?.max
          ?.toString()
          .replace(/\s/g, "")}
        &max_hours=${selectedFilters.hours?.max?.toString().replace(/\s/g, "")}
        &name=${selectedFilters.name.trim()}
        &location=${selectedFilters.location}`;
    };
    const { radius, salary, hours } = selectedFilters;
    const url = createSearchUrl({
      search: selectedFilters.name,
      location: selectedFilters.location,
      radius,
      regions: selectedFilters.regions
        .map((item) => `${item}`)
        .toString()
        .trim(),
      type: selectedFilters.types
        .map((item) => `${item.filter}`)
        .toString()
        .replace(/\s/g, ""),
      experience: selectedFilters.experiences
        .map((item, i) => `${item.filter}`)
        .toString()
        .replace(/\s/g, ""),
      category: selectedFilters.category
        .map((item, i) => `${item}`)
        .toString()
        .trim(),
      workspace: "",
      salary_min: salary?.min,
      salary_max: salary?.max,
      hours_per_week: hours.max
    });
    get(`api/v1/jobs/pages?page=${selectedPage}${url}`);
  };

  useEffect(() => {
    if (response) {
      const data: ResponseProps = response;
      setFilteredJobs(data.data);
      setPageData(data.meta);
      if (data.meta.last_page < selectedPage) {
        setSelectedPage(data.meta.last_page);
      }
    }
  }, [response]);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      searchJobs();
    }, 600);
  }, [selectedFilters, selectedPage]);

  const [search, setSearch] = useState({
    type: searchParams,
    location: locationParam,
    distance: distanceParam
  });

  /**
   *
   */
  useEffect(() => {
    const selectedP =
      pages.length > 0 && pages.length > selectedPage ? selectedPage : 0;
    const filtered = response?.data || jobs;
    //
    setFilteredJobs(filtered);
    //
    const newPages = renderPages(filtered);
    setPages(newPages);
    //
    const newPage1 = newPages[selectedP] ? newPages[selectedP].slice(0, 6) : [];
    //
    setPage1(newPage1);
    const newPage2 = newPages[selectedP]
      ? newPages[selectedP].slice(6, newPages[selectedP].length)
      : [];
    setPage2(newPage2);
  }, [
    jobs,
    search,
    selectedFilters,
    search.location,
    selectedPage,
    query,
    response
  ]);

  //
  return {
    search,
    setSearch,
    showFilters,
    setShowFilters,
    filteredJobs,
    setFilteredJobs,
    selectedFilters,
    selectedPage,
    setSelectedPage,
    pages,
    setPages,
    page1,
    setPage1,
    page2,
    setPage2,
    setFilters,
    addFilter,
    addObjectFilter,
    removeFilter,
    removeObjectFilter,
    pageData,
    loading
  };
};

export default useJobs;
