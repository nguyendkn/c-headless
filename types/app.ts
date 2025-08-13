export interface App extends Document {
  name: string;
  description?: string;
  config: Config;
}

export interface Config {
  title: string;
  description?: string;
  version: string;
}
