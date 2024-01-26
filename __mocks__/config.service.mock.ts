import { ConfigService } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export class MockConfigService implements Partial<ConfigService<IConfigs>> {
  get<T>(_propertyPath: string): T {
    return {} as T;
  }
}
