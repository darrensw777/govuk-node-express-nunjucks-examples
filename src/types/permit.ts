export interface PermitApplication {
    fullName: string;
    email: string;
    vehicleRegistration: string;
}

export type PermitField = keyof PermitApplication;

export type PermitErrors = Partial<Record<PermitField, string>>;
