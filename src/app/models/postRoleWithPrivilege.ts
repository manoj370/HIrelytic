export class newRole {
    tenantId:     string;
    roleName:   string;
    privileges: Privilege[];
}

export class Privilege {
    privilegeId:   string;
    privilegeName: string;
    status:        number;
}
