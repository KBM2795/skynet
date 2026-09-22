export interface Organization {
  id: string;
  name: string;
  slug?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: "user" | "admin" | "secops_lead" | "superadmin" | string;
  organization_id?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  organization?: Organization;
}

export interface SignUpMetadata {
  full_name?: string;
  organization_name?: string;
  organization_slug?: string;
  role?: string;
}
