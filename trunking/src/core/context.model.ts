export type TrunkingAPINotEmptyArray<K extends string, T> = Pick<Record<string, T | Array<T>>, K>;
export type TrunkingAPIBoolean = "true" | "false";
export declare const enum Role {
  SuperUser = "Super User",
  SystemAdmin = "System Admin",
  AccountAdmin = "Account Admin",
  OrganizationAdmin = "Organization Admin",
  User = "User",
  Anonymous = "Anonymous",
  AgentAdmin = "Agent Admin",
  OrganizationViewer = "Organization Viewer",
  SubAgentAdmin = "Sub-Agent Admin"
}
export interface Context {
  Action: CompleteTrunkingAPIAction | IncompleteTrunkingAPIAction;
  Request: ValidTrunkingAPIRequest | InvalidTrunkingAPIRequest;
  Session: EstablishedTrunkingAPISession | UnestablishedTrunkingAPISession;
}

declare interface TrunkingAPIAction {
  IsCompleted: TrunkingAPIBoolean;
}
declare interface CompleteTrunkingAPIAction extends TrunkingAPIAction {
  IsCompleted: "true";
}
declare interface IncompleteTrunkingAPIAction extends TrunkingAPIAction {
  IsCompleted: "false";
  Errors: TrunkingAPINotEmptyArray<"Error", TrunkingAPIError>;
}

declare interface TrunkingAPIRequest {
  DateTime: string;
  Duration: string;
  IsValid: TrunkingAPIBoolean;
}
declare interface ValidTrunkingAPIRequest extends TrunkingAPIRequest {
  IsValid: "true";
  Parameters: TrunkingAPINotEmptyArray<"Parameter", TrunkingAPIParameter>;
}
declare interface InvalidTrunkingAPIRequest extends TrunkingAPIRequest {
  IsValid: "false";
  Errors: TrunkingAPINotEmptyArray<"Error", TrunkingAPIError>;
  Parameters?: TrunkingAPINotEmptyArray<"Parameter", TrunkingAPIParameter>;
}

// `Session` helper interface
declare interface TrunkingAPISession {
  IsEstablished: TrunkingAPIBoolean;
}
declare interface EstablishedTrunkingAPISession extends TrunkingAPISession {
  IsEstablished: "true";
  Roles: TrunkingAPINotEmptyArray<"Role", { Name: Role }>;
  SessionId: string;
  UserId: string;
}
declare interface UnestablishedTrunkingAPISession extends TrunkingAPISession {
  IsEstablished: "false";
}

// `Parameter` helper interface
declare interface TrunkingAPIParameter {
  Name: string;
  Value: string;
}

// `Error` helper interface
declare interface TrunkingAPIError {
  /** see src/common/services/api/apiErrorCodes */
  Code: string;
  Message: string;
  Parameter?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare interface TrunkingApiResponse<R extends string = "", T = any> {
  Context: Context;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Result: R extends "" ? any : Pick<Record<string, T>, R>;
}
