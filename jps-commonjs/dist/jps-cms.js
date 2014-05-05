
/*
  Server-side CMS CRUD Plugin

  Usage:
  cms = new cms(endpoint: 'http://localhost:8181/api', adapter: 'http')
  cms.create('posts', title: 'new post')
  cms.update('posts', _id: 1, title: 'updated post')
  cms.destroy('posts', _id: 1)
  cms.read('posts', _id: 1)
 */
exports.cms = (function() {
  function cms(options) {
    this.options = options;
    return this;
  }

  cms.prototype.create = function(model, data) {
    return this._send('POST', model, data);
  };

  cms.prototype.read = function(model, id) {
    return this._send('GET', model, id);
  };

  cms.prototype.update = function(model, data) {
    return this._send('PUT', model, data);
  };

  cms.prototype.destroy = function(model, data) {
    return this._send('DELETE', model, data);
  };

  cms.prototype.query = function(model, data, params) {
    return this._send('GET', model, null, params);
  };

  cms.prototype._send = function(type, model, data, params) {
    var url;
    if (type == null) {
      type = 'GET';
    }
    if (data == null) {
      data = null;
    }
    if (params == null) {
      params = null;
    }
    url = this.options.endpoint + "/" + model;
    if (data != null ? data._id : void 0) {
      url += '/' + (data != null ? data._id : void 0);
    }
    console.log({
      url: url,
      type: type,
      params: params,
      dataType: "json",
      data: data
    });
    if (data) {
      return data;
    } else {
      return params;
    }
  };

  return cms;

})();
