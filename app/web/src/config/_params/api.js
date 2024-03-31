const ApiParams = {
  _defaults: {
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
    headers: {
      Authorization: `Bearer secret`,
    },
  },
  // Domains are related to data Objects (Example: "posts", "post", "users", "user", ...)
  domains: {
    posts: "posts",
    post: "posts/:id",
  },
  // Related to specific provider
  providers: {
    "react-query": {
      _defaults: {
        // By default this value is set at 0 (?)
        //staleTime: 60_000,
      },
      defaultOptions: {
        queries: {
          // @todos Based on ENV (dev=false, prod=true)
          refetchOnWindowFocus: true,
        },
      },
    },
  },
};

export default ApiParams;
