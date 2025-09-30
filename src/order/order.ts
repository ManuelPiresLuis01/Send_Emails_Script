import formatDate from "../util/formatDate.ts";
import type {
  GitlabGroup,
  GitlabProject,
  GitlabMember,
  GitlabCommit,
  GitlabMergeRequest,
  ReportRow
} from "../type/relatory.type.ts";
import { TOKEN, API_URL } from "../var/var.ts";

if (!API_URL || !TOKEN) throw new Error("❌ Missing env var");

const headers = { "PRIVATE-TOKEN": TOKEN, "Content-Type": "application/json" };

class Order {

  async fetchAll<T>(url: string): Promise<T[]> {
    let results: T[] = [];
    let page = 1;

    while (true) {
      const res = await fetch(`${url}&per_page=100&page=${page}`, { headers });
      if (!res.ok) throw new Error(`Erro API ${res.status} -> ${url}`);
      const data = (await res.json()) as T[];
      if (!data.length) break;
      results = results.concat(data);
      page++;
    }

    return results;
  }

  async getProjectData(group: GitlabGroup, project: GitlabProject): Promise<ReportRow> {
    const projectId = project.id;
    const repoName = project.name_with_namespace;

    try {
      
      const members = await this.fetchAll<GitlabMember>(
        `${API_URL}/projects/${projectId}/members/all?`
      );
      const owners = members
        .filter(m => m.access_level >= 50)
        .map(m => m.username)
        .join(";");

        
      const since = new Date();
      since.setDate(since.getDate() - 30);

      const commits = await this.fetchAll<GitlabCommit>(
        `${API_URL}/projects/${projectId}/repository/commits?since=${since.toISOString()}`
      );
      const merges = await this.fetchAll<GitlabMergeRequest>(
        `${API_URL}/projects/${projectId}/merge_requests?state=merged&updated_after=${since.toISOString()}`
      );
      const lastCommit = commits[0]?.committed_date || "N/A";

      const branches = await this.fetchAll<any>(`${API_URL}/projects/${projectId}/repository/branches?`);
      const now = new Date();

      const activeBranches = branches.filter(b => {
        const commitDateStr = b.commit?.committed_date;
        if (!commitDateStr) return false;
        const commitDate = new Date(commitDateStr);
        return (now.getTime() - commitDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
      }).length;

      const inactiveBranches = branches.length - activeBranches;

      const mrsAbertas = await this.fetchAll<GitlabMergeRequest>(
        `${API_URL}/projects/${projectId}/merge_requests?state=opened`
      );
      const issuesAbertas = await this.fetchAll<any>(
        `${API_URL}/projects/${projectId}/issues?state=opened`
      );

      return {
        grupo: group.name,
        repo: repoName,
        owners,
        commits: commits.length,
        merges: merges.length,
        lastCommit: formatDate(lastCommit),
        branches: branches.length,
        activeBranches,
        inactiveBranches,
        mrs: mrsAbertas.length,
        issues: issuesAbertas.length,
        ci: project.jobs_enabled ? "Sim" : "Não",
      };

    } catch {
      
      return {
        grupo: group.name,
        repo: repoName,
        owners: "Erro",
        commits: "Erro",
        merges: "Erro",
        lastCommit: "Erro",
        branches: "Erro",
        activeBranches: "Erro",
        inactiveBranches: "Erro",
        mrs: "Erro",
        issues: "Erro",
        ci: "Erro",
      };
    }
  }

}

export default Order;
