export class Globals {

  private static _title = 'Inventoried';
  static get title(){
    return this._title;
  }

  private static _host = 'localhost:3000';
  static get host(){
    return this._host;
  }

  private static _protocol = 'http';
  static get protocol(){
    return this._protocol;
  }

  static get request_prefix(){
    return `${this.protocol}://${this.host}/`;
  }

  private static _server_vars_route = 'server_vars';
  static get server_vars_route(){
    return this._server_vars_route;
  }

}