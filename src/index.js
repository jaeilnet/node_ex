require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const api = require('./api');
const jwtMiddleware = require('./models/lib/jwtMiddleware');

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log(e, 'mongo db');
  });

const app = new Koa();
const router = new Router();

// 라우트 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용

// koa-bodyparser 미들웨어를 적용해야 합니다.
// 이 미들웨어는 POST/PUT/PATCH 같 은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어주면,
//  이를 파싱하여 서버에서 사용할 수 있게 합니다.
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 8880;

app.listen(port, () => {
  console.log('http://localhost:8880/');
});
