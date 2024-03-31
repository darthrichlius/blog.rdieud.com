import { useQuery } from "react-query";
import { FetcherService } from "../../services";
import { Button } from "../../components";
import { useParams } from "react-router-dom";

export default function Single() {
  const Fether = new FetcherService();
  const { id: postID } = useParams();

  const { isLoading, data, error } = useQuery(
    ["post", postID],
    () =>
      Fether.find("post", {
        id: postID,
      }),
    {
      staleTime: 10_000,
    }
  );

  const Post = data || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // @todo Send to server
  };

  return (
    <>
      <div className="d-flex justify-content-between my-4">
        <h1>Edit - "{Post.title}"</h1>
      </div>
      {isLoading && <p>Loading...</p>}
      {Post && !isLoading && (
        <form onSubmit={handleSubmit}>
          <div className={"form-group"}>
            <div className="d-flex row">
              <div className="d-flex flex-column col-sm-8">
                <label for="articleTitle">Title</label>
                <input
                  type="text"
                  className={"form-control"}
                  id="articleTitle"
                  name="title"
                  placeholder="Article title"
                  value={Post.title}
                />
              </div>
              <div className="flex-column col-sm-4">
                <label className="form-check-label" for="articlePublished">
                  Published
                </label>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className={"form-check-input"}
                    id="articlePublished"
                    name="published"
                    checked={true}
                  />
                </div>
              </div>
            </div>
            <small id="ArticleHelp" className={"form-text text-muted"}>
              Don't forget to check "Published" to make your article available
            </small>
          </div>
          <div className={"form-group"}>
            <label for="articleContent">Content</label>
            <textarea
              className={"form-control"}
              id="articleContent"
              name="body"
              placeholder="Article Content"
              defaultValue={Post.body}
            />
          </div>
          <Button type="submit" className={"btn btn-primary"}>
            Submit
          </Button>
        </form>
      )}
    </>
  );
}
