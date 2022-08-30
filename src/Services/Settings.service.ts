import { env } from "process";

export const SettingService = {
  Environment: getEnvironment(
    getEnvironmentVariableValue("REACT_APP_ENVIRONMENT")
  ),
  SomeVar: getEnvironmentVariableValue("Some_Var"),
  ServerUri: "localhost:5001",
  ServerScheme: "https",
};

function getEnvironmentVariableValue(key: string): string {
  if (process.env[key]) {
    return process.env[key] as string;
  }

  return "";
}

function getEnvironment(environmentString: string): Environment {
  if (environmentString == Environment.Production) {
    return Environment.Production;
  }
  if (environmentString == Environment.Test) {
    return Environment.Test;
  }

  return Environment.Development;
}

export enum Environment {
  Production = "Production",
  Development = "Development",
  Test = "Test",
}
