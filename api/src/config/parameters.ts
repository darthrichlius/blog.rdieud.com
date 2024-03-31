import { OAS3Options } from "swagger-jsdoc";

type LinkInCOnf = {
  description: string;
  url: string;
};
interface Defaults {
  application?: {
    name?: string;
    description?: string;
    links: Array<LinkInCOnf>;
  };
  server: {
    port: number;
  };
  patterns?: Record<string, RegExp>;
  modules?: {
    OPENAPI: OAS3Options;
    [key: string]: any;
  };
}

const defaults: Defaults = {
  application: {
    name: "TODO",
    description: "TODO",
    links: [
      {
        description: "EXAMPLE",
        url: "http:localhost/",
      },
    ],
  },
  server: {
    port: 3000,
  },
  patterns: {
    /*
     *  - 8 to 20 String
     *  - At least one digit
     *  - At least one uppercase
     *  - At least one one special character
     */
    password: /^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\d).{8,20}$/,
    username: /^(?=.*[\d])[\w\d]{3,20}$/,
  },
  modules: {
    AJV: {
      options: {
        allErrors: true,
      },
    },
    OPENAPI: {
      definition: {
        openapi: "3.1.0",
        info: {
          title: "Content Management Api",
          version: "0.1.0",
          description:
            "The API reference documentation for [APP_NAME], a Content Management System built on an optimized MERN architecture",
          license: {
            name: "Proprietary License",
          },
          contact: {
            name: "rdpirate",
            // TODO: define the properties below when ready or available
            // url: "",
            // email: ""
          },
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
        ],
        tags: [
          {
            name: "Authentication",
            description: "Related to serurity operations",
          },
          {
            name: "Users",
            description: "Everything about managing the Users",
          },
        ],
        /**
         * Serve as a container for various REUSAVLE (& COMMON) definitions
         * Other schema defintions might lie directly inside route definition files
         * "Components" are refered in other definition scope using "$ref"
         *
         * This is interesting for example to define common Model or Security
         * In the case of security, we can then apply it on the root level or operation level "path" (means, if we do not specify all operation will have the default operation, and we can also override individually each operation)
         */
        components: {
          /**
           * All the security schemes supported by our API (Will make appear the modal to set the Token)
           */
          securitySchemes: {
            /* Arbitrary name for the security scheme, that acts as an ID, used later as a reference in the "path" defintion */
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT", // optional, arbitrary value for documentation purposes
            },
          },
          schemas: {
            Error: {
              type: "Object",
              required: ["status", "error"],
              properties: {
                status: {
                  type: "boolean",
                  description: "An indication whether the query failed",
                  example: false,
                },
                error: {
                  type: "object",
                  required: ["status", "message"],
                  properties: {
                    status: { type: "integer", example: 400 },
                    message: { type: "string" },
                    details: {
                      type: "string",
                      description:
                        "More details about the error. Mostly reserved to the DEVELOPMENT and TEST environments",
                    },
                  },
                },
              },
            },
            AuthResponse: {
              type: "Object",
              required: ["status", "token"],
              properties: {
                status: {
                  type: "boolean",
                  description: "An indication whether the query failed",
                  example: false,
                },
                token: {
                  type: "string",
                  example:
                    "eyJhbGciOiJIUzI1NiIXVCJ9...TJVA95OrM7E20RMHrHDcEfxjoYZgeFONFh7HgQ",
                },
              },
            },
          },
          /**
           * @see https://swagger.io/docs/specification/describing-responses/#reuse
           */
          responses: {
            // EH400
            BadRequest: {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    status: false,
                    error: {
                      status: 400,
                      message: "Invalid Payload",
                    },
                  },
                },
              },
            },
            // EH401
            Unauthorized: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    status: false,
                    error: {
                      status: 401,
                      message: "Auth headers not provided in the request",
                    },
                  },
                },
              },
            },
            // EH403
            Forbidden: {
              description: "Forbidden",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    status: false,
                    error: {
                      status: 403,
                      message:
                        "Invalid access token provided, please login again",
                    },
                  },
                },
              },
            },
            // EH404
            NotFound: {
              description: "The resource was not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    status: false,
                    error: {
                      status: 404,
                      message: "The resource was not found",
                    },
                  },
                },
              },
            },
            // EH400
            InternalError: {
              description: "Internam Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    status: false,
                    error: {
                      status: 500,
                      message: "An error error occurred on the server side",
                    },
                  },
                },
              },
            },
          },
        },
        security: [
          {
            /**
             * REMEMBER
             * Bearer security doesn't have any "scoping feature" (@see https://swagger.io/docs/specification/authentication/#security)
             * They are only available for OAuth and OpenID
             * The "[]" is only there to "fill the hole"
             */
            bearerAuth: [],
          },
        ],
      },
      /**
       * ! IMPORTANT !
       * We use absolute path here as I tried to use relative path before and was failing
       * The origin of the issue might be related to how the project handle paths
       * The app.ts file is importing modules using TypeScript paths (import UserRoutes from "~/resources/routes/UserRoutes";), using relative paths may not resolve correctly
       * * Therefore do not change this line :)
       */
      apis: [require("path").join(__dirname, "../resources/routes/*.ts")],
    } as OAS3Options,
  },
};

export default defaults;
