export interface GitlabGroup {
  id: number;
  name: string;
}

export interface GitlabProject {
  id: number;
  name: string;
  name_with_namespace: string;
  jobs_enabled: boolean;
}

export interface GitlabMember {
  id: number;
  username: string;
  access_level: number;
}

export interface GitlabCommit {
  committed_date: string;
}

export interface GitlabMergeRequest {
  id: number;
  state: string;
  updated_at: string;
}

export interface ReportRow {
  grupo: string;
  repo: string;
  owners: string;
  commits: number | string;
  merges: number | string;
  lastCommit: string;
  branches: number | string;
  mrs: number | string;
  issues: number | string;
  ci: string;
  activeBranches: number | string;    
  inactiveBranches: number | string;  
}

export interface sendEmail{
  name:string;
  email:string;
}
