export class Alert {
    id!: string;
    type!: AlertType;
    fade!: boolean;
    keepAfterRouteChange?: boolean;
    message!: string;
    autoClose!: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}