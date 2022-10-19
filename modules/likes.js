const tvId = 'HW8Zns3g7hE8XehtHEw6';

const LikeApi = async () => {
  const getLike = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`
  ).then((res) => res.json());
  return getLike;
};
LikeApi();

const NewLike = async (id) => {
  const res = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`,
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
};

export { LikeApi, NewLike };
