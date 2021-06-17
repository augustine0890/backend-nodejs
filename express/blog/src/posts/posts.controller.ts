import express, { NextFunction, Request, Response } from 'express';
import Post from './posts.interface';

class PostController {
  public path = '/posts';
  public router = express.Router();

  private posts: Post[] = [
    {
      author: 'Augustine',
      content: 'Just a content',
      title: 'Fist Post',
    },
  ];

  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
  }

  public getAllPosts = (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({ posts: this.posts });
  }

  public createAPost = (request: Request, response: Response) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(post);
  }
}

export default PostController;
