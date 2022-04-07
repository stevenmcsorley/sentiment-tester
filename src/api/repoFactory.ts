import NewsApi from "./news";

const repositories: any = {
  newsApi: NewsApi,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (name: string) => {
    return repositories[name];
  }
};