import {ArgsType} from '@nestjs/graphql';
import {CommonArgs} from '../utility/common.args';

@ArgsType()
export class SessionArgs extends CommonArgs {}
