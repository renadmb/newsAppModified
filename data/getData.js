const API_KEY = '44f7299f7a54491e9990196db82ec03f';

export const getTopHeadlines = async (category) => {
  const data = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&category=${category}`
  );

  if (data.status == 200) {
    return data.json();
  }

  return "Oops, Sorry there is some error";
};

export const getEverything = async (query) => {
  const data = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
  );

  if (data.status == 200) {
    return data.json();
  }

  return "Oops, Sorry there is some error";
};
