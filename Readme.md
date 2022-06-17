요청 유효성 검증
[JOI](https://joi.dev/api/?v=17.6.0#introduction) 라이브러리

사용방법

```js
const schema = Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// object 의 key 들을 검사해줌

const result = schema.validate(ctx.request.body);

if (result.error) {
  ctx.status = 400;
  ctx.body = result.error;
  return;
}
```

비밀번호 해시 만들기/ 검증 라이브러리

```
yarn add bcrypt
```

jwt 토큰

```
yarn add jsonwebtoken

openssl rand -hex 64
```
