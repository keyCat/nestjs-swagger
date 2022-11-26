import {createClassDecorator} from './helpers';
import {DECORATORS} from '../constants';

export type ApiModelOptions = { name: string };

export function ApiModel(options: ApiModelOptions) {
    return createClassDecorator(
        DECORATORS.API_MODEL,
        [options]
    );
}
