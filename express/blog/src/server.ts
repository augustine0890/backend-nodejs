import App from './app';
import PostController from './posts/posts.controller';

const app = new App(
  [
    new PostController(),
  ],
  3000,
);

app.listen();