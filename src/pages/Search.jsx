import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Product from "../components/Product";
import "../styles/Search.scss";

function Search(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const [data, setData] = useState({
    items: [],
    limit: 10,
    page: 0,
    total_item: 0,
  });

  useEffect(() => {
    loadProducts();
  }, [keyword, page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const url =
        process.env.REACT_APP_API_BACKEND +
        "/product?search=" +
        keyword +
        "&page=" +
        page;

      const { data } = await axios({
        url: url,
        headers: {},
        data: {},
      });

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPage = Math.ceil(data.total_item / data.limit);

  const Pagination = [];

  for (let index = 0; index < totalPage; index++) {
    Pagination.push(
      <button
        className="btn-page"
        key={index}
        onClick={() => {
          const host = `${location.pathname}?keyword=${searchParams.get(
            "keyword"
          )}&page=${index}`;
          navigate(host);
        }}
      >
        {index + 1}
      </button>
    );
  }

  const handlePageClick = (e) => {
    const host = `${location.pathname}?keyword=${searchParams.get("keyword")}
    &page=${e.selected + 1}`;
    navigate(host);
  };

  return (
    <>
      <Header />

      <div
        style={{
          margin: "200px 0px 100px 0px",
        }}
      >
        {
          <div className="container-search">
            {data.items.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
        }
        <div className="pagination">{Pagination}</div>
      </div>

      <div className="page">
        <ReactPaginate
          className="page-item"
          breakLabel="..."
          nextLabel="next >>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={Pagination.length}
          previousLabel="<< prev"
          renderOnZeroPageCount={null}
        />
      </div>

      <Footer />
    </>
  );
}

export default Search;
