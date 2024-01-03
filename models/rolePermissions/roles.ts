export interface PermissionItem {
    id: number;
    route: string;
    can_read: boolean;
    can_write: boolean;
  }

export interface Permission {
    id: number;
    name: string;
    permissions: PermissionItem[];
  }
