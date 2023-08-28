// // // .storybook/stories/Categories.stories.js

// // import React from "react";

// // import Categories from "../Categories/Categories";
// // import { rest } from "msw";
// // import { mswHandlers } from "../../api/mswhandlers";
// // import { setupWorker } from "msw";
// // import { Usercontext } from "../../App";
// // import { MemoryRouter } from "react-router";
// // export default {
// //   title: "Components/Categories",
// //   component: Categories,
// // };
// // const MockUserContext = {
// //   user: {
// //     role: "admin",
// //   },
// // };

// // // Initialize MSW worker with the defined handlers
// // const worker = setupWorker(...mswHandlers);
// // worker.start();

// // const Template = () => (
// //   <Usercontext.Provider value={MockUserContext}>
// //     <MemoryRouter>
// //       <Categories />
// //     </MemoryRouter>
// //   </Usercontext.Provider>
// // );

// // export const Default = Template.bind({});
// // export const Default2 = Template.bind({});
// // export const Default3 = Template.bind({});
// // // Default.args = {
// // //   // ... pass any necessary props here ...
// // // };

// // .storybook/stories/Categories.stories.tsx

// import React from "react";
// import { Meta, Story } from "@storybook/react";
// import Categories from "../Categories/Categories";
// import { rest } from "msw";
// import { mswHandlers } from "../../api/mswhandlers";
// import { setupWorker } from "msw";
// import { Usercontext } from "../../App";
// import { MemoryRouter } from "react-router";

// export default {
//   title: "Components/Categories",
//   component: Categories,
// } as Meta;
// // } as Meta; // Specify the Meta type

// // Mock user context
// const MockUserContext = {
//   user: {
//     role: "admin",
//   },
// };

// // Initialize MSW worker with the defined handlers
// const worker = setupWorker(...mswHandlers);
// worker.start();

// // Common Template
// const Template: Story<{ msw: any }> = (
//   { msw } // Specify the Story type
// ) => (
//   <Usercontext.Provider value={MockUserContext}>
//     <MemoryRouter>
//       <Categories />
//     </MemoryRouter>
//   </Usercontext.Provider>
// );

// // Define stories
// export const Default = Template.bind({});

// // Story for "no data" scenario
// export const NoData = Template.bind({});
// NoData.args = {
//   msw: [
//     rest.get(
//       "https://91db-210-16-94-102.ngrok-free.app/categories/no-data",
//       (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json([]));
//       }
//     ),
//   ],
// };

// // Story for "long description" scenario
// export const LongDescription = Template.bind({});
// LongDescription.args = {
//   msw: [
//     rest.get(
//       "https://91db-210-16-94-102.ngrok-free.app/categories/long-description",
//       (req, res, ctx) => {
//         const longDescriptionData = [
//           {
//             id: 3,
//             name: "Category 3",
//             description:
//               "This is a very long description that exceeds the usual length of descriptions.",
//           },
//         ];
//         return res(ctx.status(200), ctx.json(longDescriptionData));
//       }
//     ),
//   ],
// };

import React from "react";
import { Meta, Story } from "@storybook/react";
import Categories from "../Categories/Categories";
import { rest } from "msw";
import { mswHandlers } from "../../api/mswhandlers";
import { setupWorker } from "msw";
import { Usercontext } from "../../App";
import { MemoryRouter } from "react-router";

export default {
  title: "Components/Categories",
  component: Categories,
} as Meta;

const MockUserContext = {
  user: {
    role: "admin",
  },
};

// Initialize MSW worker with the defined handlers
const worker = setupWorker(...mswHandlers);
worker.start();

// Common Template
const Template: Story<{ msw: any }> = ({ msw }) => (
  <Usercontext.Provider value={MockUserContext}>
    <MemoryRouter>
      <Categories />
    </MemoryRouter>
  </Usercontext.Provider>
);

// Define stories
export const Default = Template.bind({});
console.log("2131312");
Default.args = {
  msw: [
    rest.get(
      "https://91db-210-16-94-102.ngrok-free.app/categories",
      (req, res, ctx) => {
        console.log("2131312");
        return res(
          ctx.status(200),
          ctx.json([
            { id: 1, name: "Category 1", description: "Description 1" },
            { id: 2, name: "Category 2", description: "Description 2" },
          ])
        );
      }
    ),
  ],
};

export const NoData = Template.bind({});
NoData.args = {
  msw: [
    rest.get(
      "https://91db-210-16-94-102.ngrok-free.app/categories/no-data/",
      (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      }
    ),
  ],
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  msw: [
    rest.get(
      "https://91db-210-16-94-102.ngrok-free.app/categories/long-desc/",
      (req, res, ctx) => {
        const longDescriptionData = [
          {
            id: 3,
            name: "Category 3",
            description:
              "This is a very long description that exceeds the usual length of descriptions.",
          },
        ];
        return res(ctx.status(200), ctx.json(longDescriptionData));
      }
    ),
  ],
};
