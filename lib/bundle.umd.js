(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('glob')) :
  typeof define === 'function' && define.amd ? define(['exports', 'glob'], factory) :
  (factory((global.ioc = {}),global.glob));
}(this, (function (exports,glob) { 'use strict';

  glob = glob && glob.hasOwnProperty('default') ? glob['default'] : glob;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    _setPrototypeOf(subClass.prototype, superClass && superClass.prototype);

    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) {
      return o.__proto__;
    };

    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _construct(Parent, args, Class) {
    if (typeof Reflect !== "undefined" && Reflect.construct) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Parent.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {}

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, _setPrototypeOf(function Super() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }, Class));
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var CircularDependencyError =
  /*#__PURE__*/
  function (_Error) {
    function CircularDependencyError() {
      _classCallCheck(this, CircularDependencyError);

      return _possibleConstructorReturn(this, _getPrototypeOf(CircularDependencyError).call(this, 'There is a cycle in dependencies'));
    }

    _inherits(CircularDependencyError, _Error);

    return CircularDependencyError;
  }(_wrapNativeSuper(Error));

  var DuplicateError =
  /*#__PURE__*/
  function (_Error) {
    function DuplicateError(name) {
      _classCallCheck(this, DuplicateError);

      return _possibleConstructorReturn(this, _getPrototypeOf(DuplicateError).call(this, "Multiple components with the same name: ".concat(name)));
    }

    _inherits(DuplicateError, _Error);

    return DuplicateError;
  }(_wrapNativeSuper(Error));

  var NotFoundError =
  /*#__PURE__*/
  function (_Error) {
    function NotFoundError(name) {
      _classCallCheck(this, NotFoundError);

      return _possibleConstructorReturn(this, _getPrototypeOf(NotFoundError).call(this, "Component ".concat(name, " not found")));
    }

    _inherits(NotFoundError, _Error);

    return NotFoundError;
  }(_wrapNativeSuper(Error));

  var ComponentContainer =
  /*#__PURE__*/
  function () {
    function ComponentContainer() {
      var _this = this;

      _classCallCheck(this, ComponentContainer);

      _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(this, "registered", {}), "components", {}), "getComponent", function (name) {
        var component = _this.components[name];

        if (component === undefined) {
          throw new NotFoundError(name);
        }

        return component;
      }), "createDependencies", function () {
        return Object.keys(_this.registered).forEach(_this.createDependency);
      }), "createNodeDependencies", function (key) {
        _this.registered[key].dependencies.forEach(_this.createDependency);
      }), "createDependency", function (dep) {
        if (_this.components[dep] === undefined) {
          if (_this.registered[dep].dependencies.length > 0) {
            _this.createNodeDependencies(dep);
          }

          _this.components[dep] = _construct(_this.registered[dep].constructor, _toConsumableArray(_this.getDependenciesFromContainer(_this.registered[dep].dependencies)));
        }
      }), "getDependenciesFromContainer", function (dependencies) {
        return dependencies.map(_this.getComponent);
      }), "isComponentCyclic", function (key) {
        return _this.registered[key].dependencies.includes(key) || _this.checkComponentDependencies(key, _this.registered[key].dependencies);
      });
    }

    _createClass(ComponentContainer, [{
      key: "register",
      value: function register(_ref) {
        var name = _ref.name,
            constructor = _ref.constructor,
            dependencies = _ref.dependencies;

        if (this.registered[name]) {
          throw new DuplicateError(name);
        }

        this.registered[name] = {
          name: name,
          constructor: constructor,
          dependencies: dependencies
        };
      }
    }, {
      key: "start",
      value: function start() {
        if (this.areDependenciesCyclic()) {
          throw new CircularDependencyError();
        }

        this.createDependencies();
      }
    }, {
      key: "areDependenciesCyclic",
      value: function areDependenciesCyclic() {
        return Object.keys(this.registered).some(this.isComponentCyclic);
      }
    }, {
      key: "checkComponentDependencies",
      value: function checkComponentDependencies(key, dependencies) {
        var _this2 = this;

        return dependencies.some(function (dep) {
          if (_this2.registered[dep] === undefined) {
            throw new NotFoundError(dep);
          }

          return dependencies.includes(key) || _this2.checkComponentDependencies(key, _this2.registered[dep].dependencies);
        });
      }
    }]);

    return ComponentContainer;
  }();
  var componentContainer = new ComponentContainer();

  var ComponentScan = function ComponentScan() {
    _classCallCheck(this, ComponentScan);
  };

  _defineProperty(_defineProperty(ComponentScan, "scan", function (paths) {
    paths.reduce(ComponentScan.getPaths, []).forEach(require);
  }), "getPaths", function (acc, path) {
    return _toConsumableArray(acc).concat(_toConsumableArray(glob.sync(path)));
  });

  var Bootstrap = function Bootstrap(_ref) {
    var scan = _ref.scan;
    return function (target) {
      ComponentScan.scan(scan);
      componentContainer.start();
      target.main();
    };
  };

  var Component = function Component(_ref) {
    var name = _ref.name,
        _ref$dependencies = _ref.dependencies,
        dependencies = _ref$dependencies === void 0 ? [] : _ref$dependencies;
    return function (target) {
      componentContainer.register({
        name: name,
        dependencies: dependencies,
        constructor: target
      });
    };
  };

  var InjectorService =
  /*#__PURE__*/
  function () {
    function InjectorService() {
      _classCallCheck(this, InjectorService);
    }

    _createClass(InjectorService, null, [{
      key: "get",
      value: function get(name) {
        return componentContainer.getComponent(name);
      }
    }]);

    return InjectorService;
  }();

  exports.Bootstrap = Bootstrap;
  exports.Component = Component;
  exports.Injector = InjectorService;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.umd.js.map
