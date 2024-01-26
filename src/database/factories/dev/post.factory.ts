import { faker } from '@faker-js/faker';

import { POST_STATUS } from '@/modules/posts/constants/posts.constant';

import { userFactory } from '../user.factory';

interface IPostFactory {
  id: string;
  name: string;
  slug: string;
  description: string;
  body: string;
  status: POST_STATUS;
  creator: any;
}

const statuses = [POST_STATUS.PUBLISHED, POST_STATUS.DRAFT, POST_STATUS.DELETED];

export function createRandomPost(): IPostFactory {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    slug: faker.internet.userName(),
    description: faker.internet.userName(),
    body: faker.internet.displayName(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    creator: userFactory[0]
  };
}

export const postFactory: IPostFactory[] = faker.helpers.multiple(createRandomPost, {
  count: 30
});
