import { createClient } from '@de-fi/sdk';

export const defi = createClient({
  url: 'https://public-api.de.fi/graphql',
  headers: {
    'X-Api-Key': process.env.DEFI_API_KEY
  }
});



export default eventHandler(async (event) => {
  if (!process.env.DEFI_API_KEY) {
    return sendError('DEFI_API_KEY is not set');
  }

  const { data, errors } = await defi.query({
    chains: {
      id: true,
      name: true,
    },
  });

  if (errors) {
    return { errors };
  }

  return data;
})
