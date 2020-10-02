import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import file from './routes/file';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	file(app);
	//agendash(app);
	return app
}