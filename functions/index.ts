const imageA =
  'https://imagedelivery.net/Upv7Q0MhroCOJHZCX_pZgA/9b0fabf0-8a5d-4d84-29d7-c438eb002d00/public';

const imageB =
  'https://imagedelivery.net/Upv7Q0MhroCOJHZCX_pZgA/2b143d0b-006a-47e7-db0e-ce523edf5300/public';

export const onRequestGet: PagesFunction = async ({ env, request }) => {
  const response = await env.ASSETS.fetch(request);
  const resp = new Response(response.body, response);
  resp.headers.append('Cache-Control', 'no-cache');

  const imageURL = Math.random() > 0.5 ? imageA : imageB;

  return new HTMLRewriter()
    .on('body', {
      element(body) {
        body.append(`<img src="${imageURL}" />`, { html: true });
      },
    })
    .transform(resp);
};
