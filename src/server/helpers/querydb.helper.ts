import { neon, NeonQueryFunction } from '@neondatabase/serverless';

export class QueryDBHelper {
  static #istance: QueryDBHelper;
  #neonObj!: NeonQueryFunction<false, false>;

  constructor(database_url: string) {
    if (QueryDBHelper.#istance) {
      return QueryDBHelper.#istance;
    }

    this.#neonObj = neon(database_url);
    QueryDBHelper.#istance = this;
  }

  async getVersion() {
    return await this.#neonObj`SELECT version();`;
  }

  async getClients() {
    return await this.#neonObj`
      SELECT ndg, client_name as name FROM clients
      `;
  }

  async getClient(search: string) {
    return await this.#neonObj.query(
      `SELECT ndg, client_name as name FROM clients WHERE lower(client_name) LIKE lower($1) OR CAST(ndg AS TEXT) LIKE $1;`,
      [`%${search}%`]
    );
  }

  async getOperations() {
    return await this
      .#neonObj`SELECT id as operation_id, name as type FROM operation_type`;
  }

  async setSchema() {
    await this.#neonObj`SET schema 'mol';`;
  }
}
