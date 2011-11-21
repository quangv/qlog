(function() {
  var format, log, objectFormat, size, _;

  _ = require('underscore');

  size = function(obj) {
    var count, key;
    count = 0;
    for (key in obj) {
      count++;
    }
    return count;
  };

  objectFormat = function(arg) {
    var key, obj, result, value;
    result = '\n\t{';
    obj = (function() {
      var _results;
      _results = [];
      for (key in arg) {
        value = arg[key];
        _results.push(key + ' : ' + format(value, '\n\t'));
      }
      return _results;
    })();
    result += obj.join('');
    result += '}';
    return result;
  };

  format = function() {
    var arg, d, f_name, f_size, func, h, i, m, result, results, s, val, y, _i, _len;
    results = [];
    if (arguments.length === 1 && _.isFunction(arguments[0])) {
      func = arguments[0];
      if (size(func)) {
        results.push('\t' + func.toString());
        results.push(objectFormat(func));
        return results;
      } else {
        return func.toString();
      }
    }
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      arg = arguments[_i];
      if (_.isString(arg) || _.isNumber(arg) || _.isNaN(arg) || _.isBoolean(arg) || _.isRegExp(arg)) {
        results.push(arg);
      } else if (_.isFunction(arg)) {
        f_size = size(arg);
        f_size = f_size ? " {" + f_size + "}" : '';
        f_name = arg.name ? " " + arg.name + " " : '';
        results.push("<Function" + f_name + f_size + ">");
      } else if (_.isNull(arg)) {
        results.push('null');
      } else if (_.isUndefined(arg)) {
        results.push('undefined');
      } else if (_.isDate(arg)) {
        d = arg.getDate();
        m = arg.getMonth();
        y = arg.getFullYear();
        h = arg.getHours();
        i = arg.getMinutes();
        s = arg.getSeconds();
        results.push(("|" + m + "-" + d + "-" + y) + (h ? " " + h + ":" + m + ":" + s + "|" : '|'));
      } else if (_.isArray(arg) || _.isArguments(arg)) {
        result = '[';
        result += ((function() {
          var _j, _len2, _ref, _results;
          _ref = format.apply(this, arg).split('\n');
          _results = [];
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            val = _ref[_j];
            _results.push(val + '\n\t');
          }
          return _results;
        }).call(this)).join('');
        result += ']';
        results.push(result);
      } else if (_.isObject(arg)) {
        if (arguments[1] === '\n\t') {
          result = '{Object}';
        } else {
          result = objectFormat(arg);
        }
        results.push(result);
      } else {
        results.push('ELSE_TYPE: ' + arg + ' [' + typeof arg + ']');
      }
    }
    return results.join(', ');
  };

  log = module.exports = function() {
    return console.log(' log: ' + format.apply(this, arguments));
  };

}).call(this);
