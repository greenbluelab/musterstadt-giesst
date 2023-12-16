// src/mocks/handlers.js

import { http, HttpResponse, bypass } from 'msw';

interface Payload {
  data?: Record<string, any> | Record<string, any>[] | boolean | string;
  message?: string;
  url?: string;
}

interface WateredTree {
  tree_id: string;
  uuid: string;
  amount: string;
  timestamp: string;
  username: string;
}
let location = '';
if (process.env.NODE_ENV === 'test') {
  location = '';
} else {
  if (process.env.NODE_ENV === 'development') {
    location = process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
      ? process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
      : '';
  } else if (process.env.NODE_ENV === 'production') {
    location = process.env.NEXT_PUBLIC_API_ENDPOINT_PROD
      ? process.env.NEXT_PUBLIC_API_ENDPOINT_PROD
      : '';
  } else {
    console.log('NODE_ENV is not defiend');
    location = '';
  }
}

let adoptedTreeIds: string[] = [];

const wateredAndAdopted: {
  tree_id: string;
  adopted: string;
  watered: string;
}[] = [];

const treesWatered: WateredTree[] = [];

/**
 * @deprecated Was used for non supabase api
 * Extracts top level properties from an object or URLSearchParams. Only looks for strings. with a given key. All other types are ignored and returned as undefined
 *
 */
export function getProperty(
  item: Record<string, unknown> | URLSearchParams,
  key: string
): string {
  if (item instanceof URLSearchParams) {
    const res = item.get(key);
    return res ? res : '';
  }
  return typeof item[key] === 'string' ? (item[key] as string) : '';
}

export const handlers = [
  // Handles a POST /login request

  // http.post(`${location}/login`, async (_req, res, ctx) => {
  //   return res(ctx.status(201));
  // }),

  http.delete(`${location}/v3/delete/:type`, async ({params, request}) => {
    // console.log('intercepting DELETE requests');
    const json: Payload = {};
    const bodyText = await request.text()
    let body: Record<string, unknown> = JSON.parse(bodyText) as Record<string, unknown>;
    const { type } = params;
    if (!type) {
      return HttpResponse.json({ message: 'type is undefined' }, { status: 400 })
    }
    if (typeof type !== 'string') {
      return HttpResponse.json({ message: 'type is not a string' }, { status: 400 })
    }

    // console.log(body);
    switch (type) {
      case 'unadopt': {
        // remove from adopted trees list
        // adoptedTreeIds[]
        // reduce adopted list by one
        //wateredAndAdopted
        // get a call to adopted
        // and is tree adopted
        break;
      }
      case undefined:
      case null: {
        console.log(' type is undefined or null');
        break;
      }
      default: {
        console.log('no default case for delete action defiend');
      }
    }
    return HttpResponse.json(json, { status: 201 })
  }),
  http.post(`${location}/v3/post/:type`, async ({params, request}) => {
    let json: Payload = {};
    const bodyText = await request.text()
    let body: Record<string, unknown> = JSON.parse(bodyText) as Record<string, unknown>;
    const { type } = params;
    if (!type) {
      return HttpResponse.json({ message: 'type is undefined' }, { status: 400 })
    }
    if (typeof type !== 'string') {
      return HttpResponse.json({ message: 'type is not a string' }, { status: 400 })
    }

    switch (type) {
      case 'water': {
        treesWatered.push({
          tree_id: getProperty(body, 'tree_id'),
          timestamp: new Date().toISOString(),
          uuid: getProperty(body, 'uuid'),
          username: getProperty(body, 'username'),
          amount: `${body.amount ? (body.amount as number) : 0}`,
        });
        let found = false;
        for (let i = 0; i < wateredAndAdopted.length; i++) {
          if (body.tree_id === wateredAndAdopted[i].tree_id) {
            wateredAndAdopted[i].watered = `${
              parseInt(wateredAndAdopted[i].watered) + 1
            }`;
            found = true;
            break;
          }
        }
        if (found === false) {
          wateredAndAdopted.push({
            tree_id: body.tree_id as string,
            adopted: '0',
            watered: '1',
          });
        }
        json = { data: 'watered tree', message: `${type}` };
        break;
      }
      case 'adopt': {
        adoptedTreeIds = Array.from(
          new Set<string>([body.tree_id as string, ...adoptedTreeIds])
        );

        let found = false;
        for (let i = 0; i < wateredAndAdopted.length; i++) {
          if (body.tree_id === wateredAndAdopted[i].tree_id) {
            wateredAndAdopted[i].adopted = `${
              parseInt(wateredAndAdopted[i].adopted) + 1
            }`;
            found = true;
            break;
          }
        }
        if (found === false) {
          wateredAndAdopted.push({
            tree_id: body.tree_id as string,
            adopted: '1',
            watered: '0',
          });
        }
        json = { data: 'tree was adopted', message: `${type}` };
        break;
      }
      case undefined:
      case null: {
        console.error('type url param is not defiend');
        break;
      }
      default: {
        json = {
          data: [],
          message: `default case for post ${JSON.stringify(body, null, 2)}`,
        };
      }
    }
    return HttpResponse.json(json, { status: 201 })
  }),

  // Handles a GET /user request

  http.get(`${location}/`, async () => {
    return HttpResponse.json({ foo: 'bar' }, { status: 200 })
  }),

  http.get(`${location}/v3/get/:type`, async ({params, request}) => {
    let json: Payload = {};

    const { type } = params as Record<string, unknown>;
    if (!type) {
      return HttpResponse.json({ message: 'url param is missing' }, { status: 400 })
    }
    if (typeof type === 'string') {
      return HttpResponse.json({ message: 'url param is not a string' }, { status: 400 })
    }
    const url = new URL(request.url)
    switch (type) {
      case 'treeswateredbyuser': {
        json = { data: treesWatered, message: `${type}` };

        break;
      }
      case 'treesbyids': {
        const orig = await fetch(bypass(request))
        const originalResponse = await orig.json() as { data: any };
        json = { ...originalResponse };
        break;
      }
      case 'byid': {
        const orig = await fetch(bypass(request))
        const originalResponse = await orig.json() as { data: any };
        json = { ...originalResponse };
        if (process.env.NODE_ENV === 'test') {
          json = { data: [{ id: '_abc' }] };
        }
        break;
      }
      case 'adopted': {
        json = { data: [...adoptedTreeIds], message: `${type}` };
        break;
      }
      case 'istreeadopted': {
        const id = url.searchParams.get('id');
        json = {
          data: adoptedTreeIds.includes(""+id) ? true : false,
          message: `${type}`,
        };
        break;
      }
      case 'wateredbyuser': {
        // const uuid = queries.get('uuid'); // if we need it
        json = { data: treesWatered, message: `${type}` };
        break;
      }
      case 'wateredandadopted': {
        json = { data: wateredAndAdopted, message: `${type}` };
        break;
      }
      case 'lastwatered': {
        const id = url.searchParams.get('id');

        const lastWateredByUser = treesWatered.map(tree => {
          if (tree.tree_id === id) {
            return tree;
          } else {
            return;
          }
        });
        const lastWateredByUserFiltered = lastWateredByUser.filter(Boolean); // https://stackoverflow.com/a/281335/1770432
        json = { data: lastWateredByUserFiltered, message: `${type}` };
        break;
      }
      case 'watered': {
        const watered = treesWatered.map(tree => tree.tree_id);
        json = { data: { watered }, message: `${type}` };

        break;
      }
      default: {
        // console.log('UNHANDELED request to');
        // console.log(req.url.href);
        const orig = await fetch(bypass(request))
        const originalResponse = await orig.json() as { data: any };
        json = {
          url: request.url.toString(),
          message: `case ${type} with url "${request.url.toString()}" in default case. Not yet defined and passed through`,
          ...originalResponse,
        };
        // console.log('response is patched and gets passed through', json);
        break;
      }
    }

    return HttpResponse.json(json, { status: 200 })
  }),

  http.get(
    'https://tsb-trees-api-user-management.now.sh/api/user',
    ({request}) => {
      const url = new URL(request.url)
      const id = url.searchParams.get('id');
      const json: Payload = {
        data: {
          user_id: id,
          email: 'test@gdk.de',
          email_verified: true,
          name: 'gdkboss123',
          nickname: 'the GDK boss',
          username: 'GDK OG',
        },
      };
      return HttpResponse.json(json, { status: 200 })
    }
  ),
];
