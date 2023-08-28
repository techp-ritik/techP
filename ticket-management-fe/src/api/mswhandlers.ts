import { rest } from 'msw';
import { baseUrl } from './baseapi';

export const mswHandlers = (scenario :{}) => [
  rest.get(`${baseUrl}categories`, (req, res, ctx) => {

    switch (scenario) {
        case 'no-data':
          return res(ctx.status(200), ctx.json([]));
  
        default:
          return res(
            ctx.status(200),
            ctx.json([
              { id: 3, name: 'Category 3', description: 'This is a very  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumlong description that exceeds the usual length of descriptions.' },
              { id: 2, name: 'Category 2', description: 'Description 2' },
          
            ])
          )
        }
  }),
];
