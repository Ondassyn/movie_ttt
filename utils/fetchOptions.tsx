// export const OPTIONS: Object = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
//     'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
//   },
// };

export const OPTIONS: Object = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};
