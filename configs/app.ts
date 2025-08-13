type environment = 'development' | 'production';

interface IAppConfigs {
  type: environment;
}

export const configs: IAppConfigs = {
  type: process.env['NODE_ENV'] as environment,
};
