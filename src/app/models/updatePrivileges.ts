export class TopLevel {
    userId:     string;
    tenantId:   string;
    roleId:     number;
    privileges: Privilege[];
}

export class Privilege {
    privilegeId:   string;
    privilegeName: string;
    status:        number;
}
