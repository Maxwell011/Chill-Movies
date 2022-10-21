// eslint-disable-next-line import/prefer-default-export
export default class Involvement {
  static postApp = async () => {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    const data = await response.json();
    return data;
  };

  static postComments = async (id, name, com) => {
    await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HW8Zns3g7hE8XehtHEw6/comments',
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
          username: name,
          comment: com,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  };

  static getComments = async (id) => {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HW8Zns3g7hE8XehtHEw6/comments?item_id=${id}`,
    ).then((res) => res.json());
    return response;
  };
}

export { Involvement };
