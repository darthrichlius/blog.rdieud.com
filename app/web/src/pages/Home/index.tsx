import { useQuery } from "react-query";
import { Button } from "../../components";
import { FetcherService } from "../../services";

export default function Home() {
  const queryKey = ["posts"];
  const Fetcher = new FetcherService();
  /*
    @devnotes
      * `refresh()` is used to trigger the fetch manually
      * `isFetching` is useful to transparently display when the system is fetching data. 
          This makes sense only for queries AFTER the initial fetch as the "listener" for the initial is `isLoading`
  */
  const { isLoading, data, isFetching, error, refetch } = useQuery(
    queryKey,
    () =>
      Fetcher.find("posts", {
        _limit: 13,
      }),
    {
      // staleTime: ApiParams.providers["react-query"]._defaults.staleTime or custom,
      staleTime: 60_000,
      // The call will not be triggered automatically on Component mounted
      // enabled: false,
    }
  );
  const posts = data || [];

  return (
    <>
      <div className="d-flex justify-content-between my-4">
        <div>
          <h2>Articles</h2>
          {isFetching && <div>Loading...</div>}
        </div>
        <Button type="primary" onClick={refetch}>
          Load articles
        </Button>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <div>Loading ...</div>}
          {posts && posts.map((post) => <PostRow key={post.id} post={post} />)}
        </tbody>
      </table>
    </>
  );
}

function PostRow({ post }) {
  return (
    <tr>
      <th scope="row">{post.id}</th>
      <td>{post.title}</td>
      <td>Status</td>
      <td>
        <Button href={`/post/${post.id}`}>Update</Button>
      </td>
    </tr>
  );
}
