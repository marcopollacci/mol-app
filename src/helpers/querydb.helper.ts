import { neon, NeonQueryFunction } from '@neondatabase/serverless';

export class QueryDBHelper {
  static #istance: QueryDBHelper;
  #neonObj!: NeonQueryFunction<false, false>;

  constructor(database_url: string) {
    if (QueryDBHelper.#istance) {
      return QueryDBHelper.#istance;
    }

    this.#neonObj = neon(database_url);
    this.setSchema();
    QueryDBHelper.#istance = this;
  }

  async getVersion() {
    return await this.#neonObj`SELECT version();`;
  }

  async getClients() {
    return await this.#neonObj`
      'SELECT ndg, client_name as name FROM clients'
      `;
  }

  async getClient(name: string) {
    console.log('🚀 ~ QueryDBHelper ~ getClient ~ name:', name);
    return await this
      .#neonObj`SELECT ndg, client_name as name FROM clients WHERE lower(client_name) = lower(${name});`;
  }

  async getOperations() {
    return await this
      .#neonObj`SELECT id as operation_id, name as type FROM operation_type`;
  }

  private async setSchema() {
    this.#neonObj`SET schema 'mol';`;
  }
}
