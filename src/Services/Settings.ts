export enum Environment {
  Production = "production",
  Development = "development",
  Test = "test",
}

function getEnvironmentVariableValue(key: string): string {
  let variable_key = `REACT_APP_${key}`;

  if (process.env[variable_key]) {
    return process.env[variable_key] as string;
  }

  return "";
}

function getEnvironment(environmentString: string): Environment {
  if (environmentString === Environment.Production) {
    return Environment.Production;
  }
  if (environmentString === Environment.Test) {
    return Environment.Test;
  }

  return Environment.Development;
}

export const Settings = {
  Environment:
    getEnvironment(process.env.NODE_ENV) ||
    getEnvironment(getEnvironmentVariableValue("ENVIRONMENT")),
  ServerUri: getEnvironmentVariableValue("SERVER_URI"),
  ServerScheme: getEnvironmentVariableValue("SERVER_SCHEME"),
};
