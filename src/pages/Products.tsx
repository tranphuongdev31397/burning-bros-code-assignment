import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../components";
import { productAPI } from "../api/products";
import { Params, Product, ResponseList } from "../models";
import { DEFAULT_LIMIT } from "../constants";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";

export interface ProductsProps {}

export default function Products({}: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [total, setTotal] = useState(0);
  const [params, setParams] = useState<Params>({
    limit: DEFAULT_LIMIT,
    skip: 0,
  });

  const nextPage = () => {
    if (products.length === 0) {
      return; // Skip calling nextPage() if already at the last page
    }
    setParams((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }));
  };

  const fetchProducts = async (p: Params) => {
    try {
      const res = await productAPI.getList(p);
      setProducts(products.concat(res.products));
      setTotal(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(params);
  }, [params.q, params.skip]);

  const searchProducts = (key: string) => {
    setProducts([]);
    setParams({
      ...params,
      skip: 0,
      q: key || undefined,
    });
  };

  return (
    <div
      id="scrollTarge"
      className="relative p-5 pt-0 max-h-screen h-full flex flex-col overflow-auto"
    >
      <div className="sticky left-0 py-5 top-0 w-full bg-white">
        <SearchInput onChangeDebounce={searchProducts} />
      </div>

      <InfiniteScroll
        dataLength={products.length} //This is important field to render the next data
        next={nextPage}
        className="grid grid-cols-2 flex-1 h-full gap-5"
        hasMore={products.length < total}
        loader={<div>Loading...</div>}
        endMessage={
          <div style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </div>
        }
        scrollableTarget="scrollTarge"
        refreshFunction={nextPage}
        // below props only if you need pull down functionality
      >
        {products.map((item) => (
          <CardProduct key={item.id} product={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
