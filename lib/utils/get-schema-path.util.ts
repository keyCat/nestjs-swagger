import { isString } from "@nestjs/common/utils/shared.utils";
import { DECORATORS } from "../constants";

export function getSchemaPath(model: string | Function): string {
  const modelName = isString(model) ? model : model && model.name;
  return `#/components/schemas/${modelName}`;
}

export function refs(...models: Function[]) {
  return models.map((item) => {
    const metadata = Reflect.getMetadata(DECORATORS.API_MODEL, item)?.[0];
    return {
      $ref: getSchemaPath(metadata?.name ?? item.name)
    };
  });
}
