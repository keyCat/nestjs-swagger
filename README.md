<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[OpenAPI (Swagger)](https://www.openapis.org/) module for [Nest](https://github.com/nestjs/nest).

## What's this fork?

tl;dr see https://github.com/nestjs/swagger/issues/723

The fork is 1:1 to the original project, but it adds a single feature: `ApiModel({ name: string })` decorator to allow renaming of Swagger schemas.

This is useful for namespacing purposes, and as an escape hatch (when you simply can't avoid naming collisions between your classes, for any reason).

For example, you may prefer to use TypeScript namespaces to organize your typings and DTOs:

```ts
export namespace EntityV1HttpNS {
  export namespace FooMethod {
    export namespace Response {
      export class Body {
        @ApiProperty()
        status: number;
      }
    }
  }
}

export namespace ThingV1HttpNS {
  export namespace BarMethod {
    export namespace Response {
      export class Body {
        @ApiProperty()
        message: string;
      }
    }
  }
}
```

If you use both `Body` classes as a return type for your controller methods, `@nestjs/swagger` will generate an invalid Swagger spec due to a schema pathing collision.

And since TypeScript namespaces are a compile-time feature, it is not possible (or even preferable) for `@nestjs/swagger` to use namespace names to construct schema names during runtime.

`@ApiModel()` allows you to rename `Body` in a generated Swagger spec:

```ts
export namespace EntityV1HttpNS {
  export namespace FooMethod {
    export namespace Response {
      @ApiModel({ name: 'EntityV1HttpNS.FooMethod.Response.Body' })
      export class Body {
        @ApiProperty()
        status: number;
      }
    }
  }
}

export namespace ThingV1HttpNS {
  export namespace BarMethod {
    export namespace Response {
      @ApiModel({ name: 'ThingV1HttpNS.BarMethod.Response.Body' })
      export class Body {
        @ApiProperty()
        message: string;
      }
    }
  }
}
```

Now, `@nestjs/swagger` will generate two Swagger schemas `EntityV1HttpNS.FooMethod.Response.Body` and `ThingV1HttpNS.BarMethod.Response.Body`.

## Installation

```bash
$ npm i --save @0x0c/nestjs-swagger 
```

## Quick Start

[Overview & Tutorial](https://docs.nestjs.com/openapi/introduction)

## Migration from v3

If you're currently using `@nestjs/swagger@3.*`, note the following breaking/API changes in version 4.0.

The following decorators have been changed/renamed:

- `@ApiModelProperty` is now `@ApiProperty`
- `@ApiModelPropertyOptional` is now `@ApiPropertyOptional`
- `@ApiResponseModelProperty` is now `@ApiResponseProperty`
- `@ApiImplicitQuery` is now `@ApiQuery`
- `@ApiImplicitParam` is now `@ApiParam`
- `@ApiImplicitBody` is now `@ApiBody`
- `@ApiImplicitHeader` is now `@ApiHeader`
- `@ApiOperation({ title: 'test' })` is now `@ApiOperation({ summary: 'test' })`
- `@ApiUseTags` is now `@ApiTags`

`DocumentBuilder` breaking changes (updated method signatures):

- `addTag`
- `addBearerAuth`
- `addOAuth2`
- `setContactEmail` is now `setContact`
- `setHost` has been removed
- `setSchemes` has been removed (use the `addServer` instead, e.g., `addServer('http://')`)

The following methods have been added:

- `addServer`
- `addApiKey`
- `addBasicAuth`
- `addSecurity`
- `addSecurityRequirements`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
