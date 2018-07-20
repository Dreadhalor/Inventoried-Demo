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

  private static _settings_route = 'settings/get_settings';
  static get settings_route(){
    return this._settings_route;
  }

  public static deepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

}