export class ApplicationOutput<Output = unknown, Metadata = unknown> {
  public value: Output;
  public metadata?: Metadata;
  public message?: string | Error;
  public error?: Error;

  constructor(value?: Output, metadata?: Metadata) {
    this.value = value ?? (undefined as Output);
    this.metadata = metadata ?? (undefined as Metadata);
  }

  public setMessage(message: string | Error): this {
    this.message = message;
    return this;
  }

  public isFailure(): boolean {
    return this instanceof Error;
  }

  public serialize(): {
    message?: string | Error;
    error?: {
      message?: string;
      name?: string;
      stack?: string;
    };
    value?: Output;
    metadata?: Metadata;
  } {
    return {
      message: this.message,
      error:
        this.isFailure() && this.error
          ? {
              message: this.error.message,
              name: this.error.name,
            }
          : undefined,
      value: this.value,
      metadata: this.metadata,
    };
  }

  public toHttpResponse(): any {
    return JSON.parse(JSON.stringify(this?.serialize()));
  }
}
